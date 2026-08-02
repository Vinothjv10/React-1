import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import styles from './Bio.module.css';

// Import assets
import ME_PNG from '../../assets/me.png';
import CV from '../../assets/Vinoth_DataEngineering_Resume.pdf';

gsap.registerPlugin(ScrollTrigger);

const Bio = () => {
  const roles = [
    'Big Data Engineer',
    'AI + Data Specialist',
    'AI Architect',
    'Full Stack Engineer',
    'MERN Stack Developer'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const roleRef = useRef(null);

  // GSAP animation refs
  const bioRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctasRef = useRef(null);
  const socialsRef = useRef(null);

  // Roles cycling rotator
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(roleRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          gsap.fromTo(roleRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // Entrance ScrollTrigger and avatar float
  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;

    // Entrance fade-in for left and right columns
    gsap.fromTo(leftColRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'restart reset restart reset'
        }
      }
    );

    gsap.fromTo(rightColRef.current,
      { opacity: 0, scale: 0.9, x: 50 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'restart reset restart reset'
        }
      }
    );

    // Fade-in vertical socials line on entrance
    gsap.fromTo(socialsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'restart reset restart reset'
        }
      }
    );

    // Continuous float animation for the avatar card on the right
    const floatAnim = gsap.to(rightColRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    return () => {
      floatAnim.kill();
    };
  }, []);

  const handleScrollToProjects = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.bioSection} id="bio" ref={bioRef}>
      {/* Absolute Pinned Socials on the Left */}
      <div className={styles.socialsBar} ref={socialsRef}>
        <a href="https://www.linkedin.com/in/vinothjv/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Vinothjv10" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/i_m_vinoth__/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <div className={styles.verticalLine} />
      </div>

      <div className={`container ${styles.bioContainer}`}>
        {/* Left Side: Text and Actions */}
        <div className={styles.bioLeft} ref={leftColRef}>
          <span className={styles.tagline}>Hi I'm</span>
          <h2 className={styles.name}>
            Vinoth <span className={styles.lastName}>J</span>
          </h2>
          
          {/* Animated Roles Rotator */}
          <div className={styles.rolesWrapper}>
            <span ref={roleRef} className={styles.rotatingRole}>
              {roles[roleIndex]}
            </span>
          </div>

          {/* Description Paragraph */}
          <p ref={subtitleRef} className={styles.subtitle}>
            Big Data Engineer with 4+ years of experience designing, building, and optimizing scalable cloud pipelines and high-impact analytics architectures.
          </p>

          {/* View Projects Primary Button */}
          <div className={styles.ctaPrimaryContainer}>
            <button onClick={handleScrollToProjects} className={styles.btnProjects}>
              View Projects
            </button>
          </div>

          {/* Secondary Buttons Row */}
          <div ref={ctasRef} className={styles.ctas}>
            <a href={CV} download className={styles.btnCv}>
              Download CV
            </a>
            <a href="#contact" className={styles.btnTalk}>
              Let's Talk
            </a>
          </div>
        </div>

        {/* Right Side: Backlit Glowing Avatar */}
        <div className={styles.bioRight}>
          <div className={styles.avatarGlowBackdrop} />
          <div ref={rightColRef} className={styles.avatarFrame}>
            <img src={ME_PNG} alt="Vinoth J" className={styles.avatarImg} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
