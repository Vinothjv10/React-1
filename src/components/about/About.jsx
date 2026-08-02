import React, { useEffect, useRef } from 'react';
import './about.css';
import ME from '../../assets/me_dev.png';
import { FaAward } from 'react-icons/fa';
import { TbCertificate } from 'react-icons/tb';
import { VscFolderLibrary } from 'react-icons/vsc';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Reset elements initially to avoid flash of content before ScrollTrigger triggers
        gsap.set(el.querySelectorAll('h5, h2, .about__me, .about__card, .content-p, .about__content > .btn'), {
            opacity: 0
        });

        // 1. Section Title and Subtitle Animation
        gsap.fromTo(el.querySelectorAll('h5, h2'),
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // 2. Profile Image frame scale & rotate reveal
        gsap.fromTo(el.querySelector('.about__me'),
            { opacity: 0, x: -70, scale: 0.9, rotate: -3 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: 0,
                duration: 1.4,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // 3. Right side content staggered timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el.querySelector('.about__content'),
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tl.fromTo(el.querySelectorAll('.about__card'),
            { opacity: 0, y: 50, scale: 0.9, rotateX: 12 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.3)'
            }
        )
        .fromTo(el.querySelectorAll('.content-p'),
            { opacity: 0, y: 20, filter: 'blur(3px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            },
            '-=0.45'
        )
        .fromTo(el.querySelector('.about__content > .btn'),
            { opacity: 0, y: 15, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out'
            },
            '-=0.35'
        );
    }, []);

    return (
        <section id='about' ref={sectionRef}>
            <h5>Get To Know</h5>
            <h2>About Me</h2>
            <div className="container about__container">
                <div className="about__me">
                    <div className="about__me-image">
                        <img className='about_img' src={ME} alt="loading" />
                    </div>
                </div>

                <div className="about__content">
                    <div className="about__cards">
                        <article className='about__card'>
                            <VscFolderLibrary className='about__icon' />
                            <h5>Experience</h5>
                            <div className="tags-container">
                                <div className="tag-row">
                                    <span className="tag-title">Intern</span>
                                    <span className="tag-value">1.2 Years</span>
                                </div>
                                <div className="tag-row">
                                    <span className="tag-title">Full Time</span>
                                    <span className="tag-value">3+ Years</span>
                                </div>
                            </div>
                        </article>

                        <article className='about__card'>
                            <TbCertificate className='about__icon' />
                            <h5>Certificates</h5>
                            <div className="tags-container">
                                <small>Microsoft DP-100</small>
                                <small>Microsoft DP-600</small>
                                <small>Microsoft DP-700</small>
                            </div>
                        </article>

                        <article className='about__card'>
                            <FaAward className='about__icon' />
                            <h5>Awards</h5>
                            <div className="tags-container">
                                <small>Budding Star : 2025</small>
                                <small>Rookie Trophy : 2024</small>
                            </div>
                        </article>
                    </div>

                    <div className="about__content-text">
                        <div className='content-p'>
                            <span className="text-highlight">Big Data Engineer</span> with hands-on experience in designing, implementing, and optimizing <span className="text-highlight">scalable data solutions</span> to solve real-world business challenges.
                        </div>
                        <div className='content-p'>
                            Passionate about leveraging data to drive insights and foster innovation, I bring a strong blend of technical expertise, problem-solving, and leadership. My work spans building <span className="text-highlight">robust data pipelines</span>, enabling <span className="text-highlight">advanced analytics</span>, and collaborating with cross-functional teams to deliver high-impact results.
                        </div>
                        <div className='content-p'>
                            Proficient in modern Big Data technologies, cloud platforms, and programming languages, I focus on efficient data processing, <span className="text-highlight">large-scale transformations</span>, and secure architecture practices. I’m driven by the goal of helping organizations unlock their potential through data in today’s digital world.
                        </div>
                    </div>

                    <a href="#contact" className='btn btn-primary'>
                        Let's Talk
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About