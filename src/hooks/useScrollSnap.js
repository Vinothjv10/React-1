import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const useScrollSnap = () => {
  const isAnimating = useRef(false);
  const lastScrollY = useRef(0);
  const activeIndex = useRef(0);
  const sectionsRef = useRef([]);
  const lastUserInputTime = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    // 1. Query all section and footer elements
    const updateSections = () => {
      const selectors = [
        '#home',
        '#bio',
        '#about',
        '#timeline',
        '#experience',
        '#portfolio',
        '#testimonials',
        '#contact',
        '.footer'
      ];
      sectionsRef.current = selectors
        .map(sel => document.querySelector(sel))
        .filter(el => el !== null);
    };

    updateSections();
    
    // Fallback in case the DOM is rendering dynamically/delayed
    const initTimer = setTimeout(updateSections, 500);

    lastScrollY.current = window.scrollY;

    // Detect initial active section based on current scroll position
    const detectInitialSection = () => {
      const currentScroll = window.scrollY;
      let closestIdx = 0;
      let minDiff = Infinity;
      
      sectionsRef.current.forEach((sec, idx) => {
        const diff = Math.abs(currentScroll - sec.offsetTop);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      activeIndex.current = closestIdx;
    };
    detectInitialSection();

    // GSAP Scroll animation helper
    const scrollToSection = (index) => {
      if (index < 0 || index >= sectionsRef.current.length) return;
      
      isAnimating.current = true;
      activeIndex.current = index;
      
      const targetSection = sectionsRef.current[index];
      const targetY = targetSection.offsetTop;

      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          // Add a short buffer to avoid registering scroll events triggered at the tail end of animation
          setTimeout(() => {
            isAnimating.current = false;
            lastScrollY.current = window.scrollY;
          }, 50);
        }
      });
    };

    // Track when user manually interacts
    const recordUserAction = () => {
      lastUserInputTime.current = Date.now();
    };

    // Wheel event handler
    const handleWheel = (e) => {
      recordUserAction();
      if (isAnimating.current) {
        e.preventDefault();
      }
    };

    // Touch event handlers for mobile devices
    const handleTouchStart = () => {
      recordUserAction();
    };

    const handleTouchMove = (e) => {
      recordUserAction();
      if (isAnimating.current) {
        e.preventDefault();
      }
    };

    // Keyboard handlers (Space, Arrows, PageUp/Down)
    const handleKeyDown = (e) => {
      const keys = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'];
      if (keys.includes(e.key)) {
        recordUserAction();
        if (isAnimating.current) {
          e.preventDefault();
        }
      }
    };

    // Main scroll handler
    const handleScroll = () => {
      if (isAnimating.current) {
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScroll = window.scrollY;
      const isUserScroll = Date.now() - lastUserInputTime.current < 250;

      if (!isUserScroll) {
        // If it's a programmatic scroll (like clicking a nav anchor),
        // we just update the active index to the closest section and do not snap.
        let closestIdx = 0;
        let minDiff = Infinity;
        sectionsRef.current.forEach((sec, idx) => {
          const diff = Math.abs(currentScroll - sec.offsetTop);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });
        activeIndex.current = closestIdx;
        lastScrollY.current = currentScroll;
        return;
      }

      // Clear any existing snap-back timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      const currentSec = sectionsRef.current[activeIndex.current];
      if (!currentSec) return;

      const diff = currentScroll - currentSec.offsetTop;
      const threshold = window.innerHeight * 0.3; // 30% scroll depth (less sensitive)

      if (diff > threshold) {
        // Scrolled down past 30% -> Move to next section
        scrollToSection(activeIndex.current + 1);
      } else if (diff < -threshold) {
        // Scrolled up past 30% -> Move to previous section
        scrollToSection(activeIndex.current - 1);
      } else {
        // Did not cross threshold, set a debounce to snap back to the top of current section when scrolling stops
        scrollTimeout.current = setTimeout(() => {
          if (!isAnimating.current) {
            scrollToSection(activeIndex.current);
          }
        }, 400); // 400ms debounce (less eager/sensitive)
      }

      lastScrollY.current = currentScroll;
    };

    // Attach event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(initTimer);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollSnap;
