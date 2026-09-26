import React, { useState, useEffect } from 'react';
import './nav.css';

import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RiContactsBook2Line } from 'react-icons/ri';

const LINKS = [
    { href: '#home', icon: <AiOutlineHome /> },
    { href: '#about', icon: <AiOutlineUser /> },
    { href: '#experience', icon: <BiBook /> },
    { href: '#portfolio', icon: <AiOutlineFundProjectionScreen /> },
    { href: '#contact', icon: <RiContactsBook2Line /> },
];

const Nav = () => {
    const [activeNav, setActiveNav] = useState('#home');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initially

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Highlight follows the section in view, not just the last click
    useEffect(() => {
        const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
        if (sections.length === 0) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveNav(`#${visible.target.id}`);
            },
            { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.2, 0.5] }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <nav className={isVisible ? 'visible' : ''}>
            {LINKS.map(({ href, icon }) => (
                <a
                    key={href}
                    href={href}
                    onClick={() => setActiveNav(href)}
                    className={activeNav === href ? 'active' : ''}
                    aria-label={href.slice(1)}
                    aria-current={activeNav === href ? 'true' : undefined}
                >
                    {icon}
                </a>
            ))}
        </nav>
    );
};

export default Nav;
