import React, { useState, useEffect, useRef } from 'react'
import './portfolio.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiArrowDown } from 'react-icons/fi';
import IMG0 from '../../assets/project/bot.gif';
import IMG1 from '../../assets/project/honeycomb.png';
import IMG2 from '../../assets/project/cilogo.png';
import IMG3 from '../../assets/project/spot-plant.png';
import IMG4 from '../../assets/project/bisnes.png';
import IMG5 from '../../assets/project/honeycomb.png';
import IMG6 from '../../assets/project/logo.png';
import IMG7 from '../../assets/project/goshula.png';

gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        id: 0,
        image: IMG0,
        title: 'Newsnip AI',
        github: 'https://github.com/Vinothjv10/Newsnip-AI',
        demo: 'https://newsnip.netlify.app/',
        category: 'AI & Web',
        description: 'AI-powered news summarizer that aggregates global headlines and uses natural language processing to deliver concise, byte-sized summaries.'
    },
    {
        id: 1,
        image: IMG1,
        title: 'Honeycomb Site',
        github: 'https://github.com/Vinothjv10/honeycomb-site',
        demo: 'https://www.honeycombtech.org/',
        category: 'Non-Profit',
        description: 'Official web platform for Honeycomb Tech, a non-profit organization, featuring resource directories, member portals, and donation integration.'
    },
    {
        id: 2,
        image: IMG2,
        title: 'Technoblaze',
        github: 'https://github.com/Vinothjv10/technoblaze',
        demo: 'https://technoblaze.netlify.app/',
        category: 'E-Commerce',
        description: 'A high-performance e-commerce platform with search filters, real-time cart updates, and a responsive product grid.'
    },
    {
        id: 3,
        image: IMG3,
        title: 'Spot Plant',
        github: 'https://github.com/Plants-Site/Spot-plant',
        demo: 'https://plant-6cd6e.web.app/',
        category: 'AgriTech',
        description: 'AgriTech application designed to identify plant diseases from photos, providing tailored organic remedies and growth tracking.'
    },
    {
        id: 4,
        image: IMG4,
        title: 'Bisnes Company',
        github: 'https://github.com/Vinothjv10/front_end_page',
        demo: 'https://company-jv.web.app/',
        category: 'Business Web',
        description: 'Corporate presentation site showcasing agency services, client portfolios, interactive contact channels, and team profiles.'
    },
    {
        id: 5,
        image: IMG5,
        title: 'Honeycomb Site-2',
        github: 'https://github.com/Vinothjv10/WT-A1',
        demo: 'https://companysite-1d719.web.app/',
        category: 'Corporate',
        description: 'Redesigned digital home for Honeycomb, optimized for speed, accessibility, and dynamic modern animation layout.'
    },
    {
        id: 6,
        image: IMG6,
        title: 'Shiksha',
        github: 'https://github.com/Vinothjv10/Shiksha',
        demo: 'https://shiksha-jv.netlify.app/',
        category: 'EdTech',
        description: 'Online education platform featuring class modules, interactive quizzes, teacher-student communication dashboards, and progress reporting.'
    },
    {
        id: 7,
        image: IMG7,
        title: 'Goshala',
        github: 'https://github.com/Vinothjv10/Goshala',
        demo: ' ',
        category: 'Charity',
        description: 'Community charity portal managing cattle welfare donations, volunteer registrations, and shelter gallery updates.'
    },
]

const Portfolio = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // Mouse drag gesture references
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeftVal = useRef(0);
    const dragMoved = useRef(false);

    // GSAP Entrance Animations
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelectorAll('.portfolio__item'),
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }, []);

    // passive Wheel scroll translation (vertical scroll wheel to horizontal slide scroll with boundary escape - inverted direction)
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleWheel = (e) => {
            const { scrollWidth, clientWidth } = slider;
            const maxScroll = scrollWidth - clientWidth;
            const currentScrollLeft = slider.scrollLeft;

            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                // Vertical wheel inputs: Map scroll top to horizontal right, scroll bottom to horizontal left
                if (e.deltaY < 0) {
                    // Wheel up / "scroll top": scroll horizontal right
                    if (currentScrollLeft < maxScroll - 5) {
                        e.preventDefault();
                        slider.scrollLeft = Math.min(currentScrollLeft - e.deltaY, maxScroll);
                    }
                } else {
                    // Wheel down / "scroll bottom": scroll horizontal left
                    if (currentScrollLeft > 5) {
                        e.preventDefault();
                        slider.scrollLeft = Math.max(currentScrollLeft - e.deltaY, 0);
                    }
                }
            }
            // Do NOT block or translate horizontal deltaX scrolls: letting the browser scroll trackpad swipes natively
        };

        slider.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            slider.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Mouse Drag to Scroll handlers
    const handleMouseDown = (e) => {
        isDown.current = true;
        dragMoved.current = false;
        sliderRef.current.classList.add('grabbing');
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeftVal.current = sliderRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        if (sliderRef.current) {
            sliderRef.current.classList.remove('grabbing');
        }
    };

    const handleMouseUp = () => {
        isDown.current = false;
        if (sliderRef.current) {
            sliderRef.current.classList.remove('grabbing');
        }
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        if (Math.abs(walk) > 5) {
            dragMoved.current = true;
        }
        e.preventDefault();
        sliderRef.current.scrollLeft = scrollLeftVal.current - walk;
    };

    const handleClickCapture = (e) => {
        if (dragMoved.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    // Calculate active index on scroll
    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft } = sliderRef.current;

        const items = sliderRef.current.querySelectorAll('.portfolio__item');
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderRef.current);
            const gapValue = parseFloat(style.columnGap || style.gap) || 0;
            const cardSize = itemWidth + gapValue;

            const activeIndex = Math.round(scrollLeft / cardSize);
            setActiveCardIndex(activeIndex);
        }
    };

    return (
        <section id='portfolio' ref={sectionRef}>
            <h5>My Recent Work</h5>
            <h2>Projects</h2>

            <div 
                className="portfolio__container" 
                ref={sliderRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onClickCapture={handleClickCapture}
            >
                {
                    data.map(({ id, image, title, github, demo, category, description }) => {
                        const isActive = id === activeCardIndex;
                        return (
                            <article key={id} className={`portfolio__item ${isActive ? 'active' : ''}`}>
                                <div className="portfolio__item-image">
                                    <img src={image} alt={title} />
                                    <div className="portfolio__item-hover-content">
                                        <p>{description}</p>
                                    </div>
                                </div>

                                <span className="portfolio__item-tag">{category}</span>
                                <h3>{title}</h3>
                                <p className="portfolio__item-description">{description}</p>
                                <div className="portfolio__item-cta">
                                    <a href={github} className='btn' target='_blank' rel="noopener noreferrer">
                                        <FiGithub style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Github
                                    </a>
                                    {demo && demo.trim() !== '' ? (
                                        <a href={demo} className='btn btn-primary' target='_blank' rel="noopener noreferrer">
                                            Live Demo <FiExternalLink style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                                        </a>
                                    ) : (
                                        <button className='btn btn-primary' disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                            No Demo
                                        </button>
                                    )}
                                </div>
                            </article>
                        )
                    })
                }

                {/* Final GitHub CTA and Scroll Indicator Card */}
                <article className={`portfolio__item portfolio__item-more ${activeCardIndex === data.length ? 'active' : ''}`}>
                    <div className="portfolio__more-content">
                        <FiGithub className="portfolio__more-icon" />
                        <h3>Want to see more?</h3>
                        <p>If you want to know more about my projects, you can visit my GitHub profile.</p>
                        <a 
                            href="https://github.com/Vinothjv10" 
                            className="btn btn-primary portfolio__more-btn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FiGithub /> Visit Profile
                        </a>
                        <div className="portfolio__scroll-indicator">
                            <span>Scroll for next section</span>
                            <FiArrowDown className="scroll-indicator__arrow" />
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Portfolio