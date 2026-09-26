import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { effectsEnabled } from '../../utils/motion';
import './cursor.css';

/*
 * Soft orange ring that trails the native cursor and expands over links and
 * buttons. The native cursor is left visible. Desktop only; never rendered on
 * touch devices or for reduced-motion users.
 */
const Cursor = () => {
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(effectsEnabled());
    }, []);

    useEffect(() => {
        const ring = ringRef.current;
        if (!enabled || !ring) return undefined;

        const moveX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
        const moveY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

        const onMove = (e) => {
            moveX(e.clientX);
            moveY(e.clientY);
        };
        const onOver = (e) => {
            const interactive = e.target.closest('a, button, .btn, input, textarea, [data-cursor]');
            ring.classList.toggle('is-active', Boolean(interactive));
        };
        const onLeave = () => ring.classList.add('is-hidden');
        const onEnter = () => ring.classList.remove('is-hidden');

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerover', onOver, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerover', onOver);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [enabled]);

    if (!enabled) return null;
    return <div ref={ringRef} className="cursor-ring is-hidden" aria-hidden="true" />;
};

export default Cursor;
