import { useEffect } from 'react';
import { gsap } from 'gsap';
import { effectsEnabled } from '../utils/motion';

/*
 * 3D hover tilt for cards, plus a radial highlight that follows the pointer
 * (driven by the --mx / --my custom properties, see index.css .tilt-glow).
 * Delegated, so it works for cards rendered at any time. Desktop only.
 */
const useTilt = (selector, max = 5) => {
    useEffect(() => {
        if (!selector || !effectsEnabled()) return undefined;

        const onMove = (e) => {
            const el = e.target.closest(selector);
            if (!el) return;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            el.classList.add('tilt-glow');
            el.style.setProperty('--mx', `${px * 100}%`);
            el.style.setProperty('--my', `${py * 100}%`);
            gsap.to(el, {
                rotateY: (px - 0.5) * max * 2,
                rotateX: (0.5 - py) * max * 2,
                y: -5, // keeps the original CSS hover lift, which an inline transform would otherwise cancel
                transformPerspective: 900,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        };
        const onOut = (e) => {
            const el = e.target.closest(selector);
            if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
            gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
        };

        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onOut, { passive: true });
        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerout', onOut);
        };
    }, [selector, max]);
};

export default useTilt;
