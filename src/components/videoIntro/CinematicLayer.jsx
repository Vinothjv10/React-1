import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CinematicLayer = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Create Glow Texture Procedurally ---
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        // Bright white center fading to warm orange and transparent edge
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 200, 100, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    // --- Particles Geometry & Material ---
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phaseX = new Float32Array(particleCount);
    const phaseY = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3);

    const orangeColor = new THREE.Color('#ff7b00');
    const whiteColor = new THREE.Color('#ffffff');
    const amberColor = new THREE.Color('#ffb732');

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates inside a bounding box
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10 - 2; // Keep them spanning depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Color mix: Warm orange vs warm amber vs bright white
      const rand = Math.random();
      let colorMix;
      if (rand < 0.5) {
        colorMix = orangeColor;
      } else if (rand < 0.8) {
        colorMix = amberColor;
      } else {
        colorMix = whiteColor;
      }

      colors[i * 3] = colorMix.r;
      colors[i * 3 + 1] = colorMix.g;
      colors[i * 3 + 2] = colorMix.b;

      // Motion factors
      speeds[i] = 0.1 + Math.random() * 0.3;
      phaseX[i] = Math.random() * Math.PI * 2;
      phaseY[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interactive Mouse Parallax variables ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Normalize to -1 to 1
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Window Resizing
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // --- Animation loop ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particle positions (slow floating sine waves)
      const positionsArr = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Sine wave oscillations on Y and X
        positionsArr[i3 + 1] = initialPositions[i3 + 1] + Math.sin(elapsedTime * speeds[i] + phaseX[i]) * 0.4;
        positionsArr[i3] = initialPositions[i3] + Math.cos(elapsedTime * (speeds[i] * 0.8) + phaseY[i]) * 0.3;
      }
      geometry.attributes.position.needsUpdate = true;

      // Mouse Parallax camera lerp
      targetX = mouseX * 1.5;
      targetY = -mouseY * 1.2;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose resources
      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', pointerEvents: 'none' }} />;
};

export default CinematicLayer;
