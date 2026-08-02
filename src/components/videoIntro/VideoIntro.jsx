import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';

// Import local assets
import aboutMeVideo from '../../assets/about_me.mp4';

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // GSAP animation refs
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const scrollRef = useRef(null);
  const controlsRef = useRef(null);

  // Split text helper to map each character into an animatable span
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    // --- GSAP Entrance Animation ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      const chars = nameRef.current.querySelectorAll('.char');

      // Initialize foreground video to be sharp and bright
      gsap.set(videoRef.current, {
        filter: 'blur(0px) brightness(0.85)',
        opacity: 0.95
      });

      // 1. Controls fade in immediately on page load (0.5s) so users can unmute right away
      gsap.fromTo(controlsRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
        0.5
      );

      // 2. Video dimming transition at 6.0 seconds (remains sharp, no blur, to show developer clearly)
      tl.to(videoRef.current, {
        filter: 'blur(0px) brightness(0.65)',
        opacity: 0.85,
        duration: 1.8,
        ease: 'power2.inOut'
      }, 6.0)
      // 3. Stagger-in the tagline and title overlay content
      .fromTo(taglineRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        6.2
      )
      .fromTo(nameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        6.4
      )
      // Staggered 3D letter bounce-in reveal
      .fromTo(chars, 
        { opacity: 0, y: 55, rotateX: -70, scale: 0.8 }, 
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.06, ease: 'back.out(1.5)' }, 
        6.4
      )
      .fromTo(scrollRef.current, 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        7.0
      );
    });

    // Auto-hide sound badge after 5 seconds of loading
    const badgeTimer = setTimeout(() => {
      setShowSoundBadge(false);
    }, 5000);

    return () => {
      ctx.revert();
      clearTimeout(badgeTimer);
    };
  }, []);

  // Synchronized Play/Pause controls
  const handlePlayPause = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      videoRef.current?.pause();
      bgVideoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play().catch(err => console.log(err));
      bgVideoRef.current?.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  // Sound control toggle
  const handleMuteToggle = (e) => {
    if (e) e.stopPropagation();
    const newMutedState = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
    setIsMuted(newMutedState);
    if (!newMutedState) {
      setShowSoundBadge(false);
    }
  };

  // Auto scroll down when the main video finishes playing
  const handleVideoEnded = () => {
    const nextSection = document.getElementById('bio');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll helper
  const handleScrollDown = () => {
    const nextSection = document.getElementById('bio');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.videoIntro} id="home">
      {/* 1. Background Ambient Blurred Video (Always loops for background lighting) */}
      <video
        ref={bgVideoRef}
        className={styles.bgAmbient}
        src={aboutMeVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 2. Foreground Main Full-screen Video (Plays once, triggers auto-scroll on end) */}
      <video
        ref={videoRef}
        className={styles.foregroundVideo}
        src={aboutMeVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* Cinematic Gradient & Vignette Overlays */}
      <div className={styles.overlay} />

      {/* 3. Three.js Floating Particle Layer */}
      <CinematicLayer className={styles.canvasLayer} />

      {/* 4. Center-stacked Hero Content */}
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <span ref={taglineRef} className={styles.tagline}>
            Welcome to my space
          </span>
          <h1 ref={nameRef} className={styles.name} style={{ perspective: '1000px' }}>
            <span className={styles.firstName}>
              {splitText("Vinoth")}
            </span>
            {'\u00A0'}
            <span className={styles.lastName}>
              {splitText("J")}
            </span>
          </h1>
        </div>
      </div>

      {/* 5. Floating Play/Pause & Sound Controls at Bottom Right */}
      <div ref={controlsRef} className={styles.floatingControls}>
        {showSoundBadge && (
          <div className={styles.soundBadge}>
            <span className={styles.pulseDot} />
            Tap for sound
          </div>
        )}
        <div className={styles.controlsOverlay}>
          <button 
            className={styles.controlBtn} 
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button 
            className={styles.controlBtn} 
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      {/* 6. Bottom Scroll Down Indicator */}
      <button 
        ref={scrollRef} 
        className={styles.scrollIndicator} 
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
      >
        <span>Explore More</span>
        <div className={styles.scrollLine}>
          <span className={styles.scrollDot} />
        </div>
      </button>
    </section>
  );
};

export default VideoIntro;
