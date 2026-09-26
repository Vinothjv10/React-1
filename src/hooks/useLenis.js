import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

/*
 * Smooth (inertial) scrolling driven by GSAP's ticker so the existing
 * ScrollTrigger animations in every section stay perfectly in sync.
 * Unlike the old scroll-snap hook this never blocks or hijacks input — the
 * user always scrolls exactly where they intend.
 */
const useLenis = () => {
    useEffect(() => {
        if (prefersReducedMotion()) return undefined;

        const lenis = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.9,
            anchors: true, // nav / footer #hash links glide instead of jumping
        });

        lenis.on('scroll', ScrollTrigger.update);
        const tick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
        };
    }, []);
};

export default useLenis;
