import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { prefersReducedMotion } from '../../utils/motion';
import './background.css';

/*
 * Site-wide floating glow particles — the same warm particle field the video
 * intro uses, extended behind every section. Fixed to the viewport, reacts to
 * the mouse (camera parallax) and to scrolling (particles drift and wrap), and
 * recolours itself when the theme changes.
 *
 * Cost control: capped pixel ratio, fewer particles on small screens, the
 * render loop stops while the tab is hidden, and reduced-motion users get a
 * single static frame.
 */

const PALETTES = {
    dark: { colors: ['#ff7b00', '#ffb732', '#ffffff'], weights: [0.5, 0.3, 0.2], opacity: 0.75 },
    light: { colors: ['#e06600', '#c47a1a', '#3a3a44'], weights: [0.5, 0.3, 0.2], opacity: 0.45 },
};

const makeGlowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.55)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.12)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
};

const pickColor = (palette, rand) => {
    let acc = 0;
    for (let i = 0; i < palette.colors.length; i++) {
        acc += palette.weights[i];
        if (rand < acc) return palette.colors[i];
    }
    return palette.colors[palette.colors.length - 1];
};

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const themeRef = useRef(theme);
    const recolorRef = useRef(null);

    // Recolour without rebuilding the scene when the theme changes
    useEffect(() => {
        themeRef.current = theme;
        if (recolorRef.current) recolorRef.current(theme);
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const reduced = prefersReducedMotion();
        const isSmall = window.innerWidth < 768;
        const count = isSmall ? 140 : 320;

        // --- Scene ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 9;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // --- Particles ---
        const SPREAD_X = 22;
        const SPREAD_Y = 14;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const basePositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        const phases = new Float32Array(count);
        const colorSeeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * SPREAD_X;
            const y = (Math.random() - 0.5) * SPREAD_Y;
            const z = (Math.random() - 0.5) * 12 - 2;
            positions.set([x, y, z], i * 3);
            basePositions.set([x, y, z], i * 3);
            speeds[i] = 0.08 + Math.random() * 0.25;
            phases[i] = Math.random() * Math.PI * 2;
            colorSeeds[i] = Math.random();
        }

        const applyPalette = (name) => {
            const palette = PALETTES[name] || PALETTES.dark;
            const c = new THREE.Color();
            for (let i = 0; i < count; i++) {
                c.set(pickColor(palette, colorSeeds[i]));
                colors.set([c.r, c.g, c.b], i * 3);
            }
            geometry.attributes.color.needsUpdate = true;
            material.opacity = palette.opacity;
        };

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const glowTexture = makeGlowTexture();
        const material = new THREE.PointsMaterial({
            size: 0.38,
            map: glowTexture,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        applyPalette(themeRef.current);
        recolorRef.current = (name) => {
            applyPalette(name);
            // Light mode uses normal blending so dark particles stay visible on a pale page
            material.blending = name === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
            material.needsUpdate = true;
            if (reduced) renderer.render(scene, camera);
        };
        if (themeRef.current === 'light') recolorRef.current('light');

        // --- Inputs ---
        let mouseX = 0;
        let mouseY = 0;
        let scrollOffset = 0;
        const onPointerMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        const onScroll = () => {
            scrollOffset = window.scrollY * 0.004;
        };
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        onScroll();

        // --- Loop ---
        const clock = new THREE.Clock();
        let frameId = 0;
        let running = false;

        const wrap = (value, range) => {
            const half = range / 2;
            let v = (value + half) % range;
            if (v < 0) v += range;
            return v - half;
        };

        const renderFrame = () => {
            const t = clock.getElapsedTime();
            const arr = geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                // Slow sine float + upward drift while scrolling, wrapped so the field never empties
                arr[i3] = basePositions[i3] + Math.cos(t * speeds[i] * 0.8 + phases[i]) * 0.35;
                arr[i3 + 1] = wrap(basePositions[i3 + 1] + Math.sin(t * speeds[i] + phases[i]) * 0.4 + scrollOffset, SPREAD_Y);
            }
            geometry.attributes.position.needsUpdate = true;

            camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
            camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };

        const loop = () => {
            renderFrame();
            frameId = requestAnimationFrame(loop);
        };
        const start = () => {
            if (running || reduced) return;
            running = true;
            clock.start();
            frameId = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(frameId);
            clock.stop();
        };
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);

        if (reduced) {
            renderFrame(); // one static frame
        } else {
            start();
        }

        return () => {
            stop();
            recolorRef.current = null;
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            geometry.dispose();
            material.dispose();
            glowTexture.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />;
};

export default ParticleBackground;
