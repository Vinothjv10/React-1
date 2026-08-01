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

        // Animate profile image
        gsap.fromTo(el.querySelector('.about__me'),
            { opacity: 0, x: -50, scale: 0.9 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Timeline for card contents and buttons
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        tl.fromTo(el.querySelectorAll('.about__card'),
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        )
        .fromTo(el.querySelectorAll('.content-p'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
            '-=0.4'
        )
        .fromTo(el.querySelector('.about__content > a'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.3'
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
                            <h5>Microsoft Certificates</h5>
                            <div className="tags-container">
                                <small>DP-100</small>
                                <small>DP-600</small>
                                <small>DP-700</small>
                            </div>
                        </article>

                        <article className='about__card'>
                            <FaAward className='about__icon' />
                            <h5>Awards</h5>
                            <div className="tags-container">
                                <small>Budding Star : 2025</small>
                                <small> Rookie Trophy : 2024</small>
                            </div>
                        </article>
                    </div>

                    <div>
                        <div className='content-p'>
                            Big Data Engineer with hands-on experience in designing, implementing, and optimizing scalable data solutions to solve real-world business challenges.
                        </div>
                        <div className='content-p'>
                            Passionate about leveraging data to drive insights and foster innovation, I bring a strong blend of technical expertise, problem-solving skills, and leadership. My work spans building robust data pipelines, enabling advanced analytics, and collaborating with cross-functional teams to deliver impactful results.
                        </div>
                        <div className='content-p'>
                            Proficient in Big Data technologies, cloud platforms, and programming languages, I continue to focus on efficient data processing, large-scale transformations, and secure architecture practices. I’m driven by the goal of helping organizations unlock their potential through data in today’s digital world.
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