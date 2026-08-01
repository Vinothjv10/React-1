import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';

// Import local assets
import aboutMeVideo from '../../assets/about_me.mp4';
import CV from '../../assets/Vinoth_DataEngineering_Resume.pdf';

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // GSAP animation refs
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctasRef = useRef(null);
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

      tl.fromTo(taglineRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        0.3
      )
      .fromTo(nameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.4
      )
      // Staggered 3D letter bounce-in reveal
      .fromTo(chars, 
        { opacity: 0, y: 55, rotateX: -70, scale: 0.8 }, 
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.06, ease: 'back.out(1.5)' }, 
        0.4
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 35 }, 
        { opacity: 1, y: 0 }, 
        1.0
      )
      .fromTo(ctasRef.current, 
        { opacity: 0, y: 35 }, 
        { opacity: 1, y: 0 }, 
        1.2
      )
      .fromTo(controlsRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1 },
        1.4
      )
      .fromTo(scrollRef.current, 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        1.6
      );
    });

    // Auto-hide sound badge after 4 seconds
    const badgeTimer = setTimeout(() => {
      setShowSoundBadge(false);
    }, 4000);

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

  // Smooth scroll helper
  const handleScrollDown = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.videoIntro} id="home">
      {/* 1. Background Ambient Blurred Video */}
      <video
        ref={bgVideoRef}
        className={styles.bgAmbient}
        src={aboutMeVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 2. Foreground Main Full-screen Video */}
      <video
        ref={videoRef}
        className={styles.foregroundVideo}
        src={aboutMeVideo}
        autoPlay
        loop
        muted
        playsInline
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
          <p ref={subtitleRef} className={styles.subtitle}>
            Big Data Engineer with 4+ years of experience designing, building, and optimizing scalable cloud pipelines and high-impact analytics architectures.
          </p>

          <div ref={ctasRef} className={styles.ctas}>
            <a href={CV} download className={styles.btnCv}>
              Download CV
            </a>
            <a href="#contact" className={styles.btnTalk}>
              Let's Talk
            </a>
          </div>
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
