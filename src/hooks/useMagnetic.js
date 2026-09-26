import { useEffect } from 'react';
import { gsap } from 'gsap';
import { effectsEnabled } from '../utils/motion';

/*
 * "Magnetic" buttons: any element matching `selector` gently follows the
 * pointer while hovered and springs back on leave. Uses event delegation so
 * buttons rendered later (form states, skill inspector…) get the effect too.
 */
const useMagnetic = (selector = '.btn, .theme-toggle, nav a', strength = 0.3) => {
    useEffect(() => {
        if (!effectsEnabled()) return undefined;

        const onMove = (e) => {
            const el = e.target.closest(selector);
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
        };
        const onOut = (e) => {
            const el = e.target.closest(selector);
            if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
            gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
        };

        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onOut, { passive: true });
        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerout', onOut);
        };
    }, [selector, strength]);
};

export default useMagnetic;
