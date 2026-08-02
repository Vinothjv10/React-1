import React, { useState, useEffect, useRef } from 'react'
import './portfolio.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
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
        category: 'AI & Web'
    },
    {
        id: 1,
        image: IMG1,
        title: 'Honeycomb Site',
        github: 'https://github.com/Vinothjv10/honeycomb-site',
        demo: 'https://www.honeycombtech.org/',
        category: 'Non-Profit'
    },
    {
        id: 2,
        image: IMG2,
        title: 'Technoblaze',
        github: 'https://github.com/Vinothjv10/technoblaze',
        demo: 'https://technoblaze.netlify.app/',
        category: 'E-Commerce'
    },
    {
        id: 3,
        image: IMG3,
        title: 'Spot Plant',
        github: 'https://github.com/Plants-Site/Spot-plant',
        demo: 'https://plant-6cd6e.web.app/',
        category: 'AgriTech'
    },
    {
        id: 4,
        image: IMG4,
        title: 'Bisnes Company',
        github: 'https://github.com/Vinothjv10/front_end_page',
        demo: 'https://company-jv.web.app/',
        category: 'Business Web'
    },
    {
        id: 5,
        image: IMG5,
        title: 'Honeycomb Site-2',
        github: 'https://github.com/Vinothjv10/WT-A1',
        demo: 'https://companysite-1d719.web.app/',
        category: 'Corporate'
    },
    {
        id: 6,
        image: IMG6,
        title: 'Shiksha',
        github: 'https://github.com/Vinothjv10/Shiksha',
        demo: 'https://shiksha-jv.netlify.app/',
        category: 'EdTech'
    },
    {
        id: 7,
        image: IMG7,
        title: 'Goshala',
        github: 'https://github.com/Vinothjv10/Goshala',
        demo: ' ',
        category: 'Charity'
    },
]

const Portfolio = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const [pageSize, setPageSize] = useState(3);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Update page size dynamically based on screen width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setPageSize(1);
            } else if (window.innerWidth <= 1024) {
                setPageSize(2);
            } else {
                setPageSize(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Generate dynamic page indices depending on active page size
    const pageIndices = [];
    for (let i = 0; i < data.length; i += pageSize) {
        pageIndices.push(i);
    }

    // Determine current active page index based on card index closest to the current view
    const activePageIndex = pageIndices.reduce((prev, curr, idx) => {
        return Math.abs(curr - activeCardIndex) < Math.abs(pageIndices[prev] - activeCardIndex) ? idx : prev;
    }, 0);

    // Track scroll location to update progress variables
    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0;
        setScrollProgress(progress);

        const items = sliderRef.current.querySelectorAll('.portfolio__item');
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderRef.current);
            const gapValue = parseFloat(style.columnGap || style.gap) || 0;
            const cardSize = itemWidth + gapValue;

            const activeCard = Math.round(scrollLeft / cardSize);
            setActiveCardIndex(activeCard);
        }
    };

    // Helper functions for smooth horizontal scroll snapping
    const scrollNext = () => {
        if (!sliderRef.current) return;
        const items = sliderRef.current.querySelectorAll('.portfolio__item');
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderRef.current);
            const gapValue = parseFloat(style.columnGap || style.gap) || 0;
            const cardSize = itemWidth + gapValue;

            const nextPageStart = pageIndices.find(idx => idx > activeCardIndex);
            if (nextPageStart !== undefined) {
                sliderRef.current.scrollTo({
                    left: nextPageStart * cardSize,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollPrev = () => {
        if (!sliderRef.current) return;
        const items = sliderRef.current.querySelectorAll('.portfolio__item');
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderRef.current);
            const gapValue = parseFloat(style.columnGap || style.gap) || 0;
            const cardSize = itemWidth + gapValue;

            const prevPageStart = [...pageIndices].reverse().find(idx => idx < activeCardIndex);
            if (prevPageStart !== undefined) {
                sliderRef.current.scrollTo({
                    left: prevPageStart * cardSize,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollToPage = (pageIdx) => {
        if (!sliderRef.current) return;
        const items = sliderRef.current.querySelectorAll('.portfolio__item');
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderRef.current);
            const gapValue = parseFloat(style.columnGap || style.gap) || 0;
            const cardSize = itemWidth + gapValue;

            const targetIndex = pageIndices[pageIdx];
            sliderRef.current.scrollTo({
                left: targetIndex * cardSize,
                behavior: 'smooth'
            });
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
            >
                {
                    data.map(({ id, image, title, github, demo, category }) => {
                        return (
                            <article key={id} className='portfolio__item'>
                                <div className="portfolio__item-image">
                                    <img src={image} alt={title} />
                                </div>

                                <span className="portfolio__item-tag">{category}</span>
                                <h3>{title}</h3>
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
            </div>

            <div className="portfolio__controls-wrapper">
                <div className="portfolio__controls">
                    <button 
                        className="portfolio__nav-btn" 
                        onClick={scrollPrev} 
                        disabled={scrollProgress <= 0.01}
                        aria-label="Previous project page"
                    >
                        <svg className="progress-ring" width="56" height="56">
                            <circle className="progress-ring__circle-bg" cx="28" cy="28" r="24" />
                            <circle 
                                className="progress-ring__circle" 
                                cx="28" 
                                cy="28" 
                                r="24" 
                                strokeDasharray="151"
                                strokeDashoffset={151 - (151 * (1 - scrollProgress))} 
                            />
                        </svg>
                        <FiArrowLeft className="nav-icon" />
                    </button>

                    <div className="portfolio__dots">
                        {pageIndices.map((pageStart, index) => (
                            <button
                                key={index}
                                className={`portfolio__dot ${index === activePageIndex ? 'active' : ''}`}
                                onClick={() => scrollToPage(index)}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button 
                        className="portfolio__nav-btn" 
                        onClick={scrollNext} 
                        disabled={scrollProgress >= 0.99}
                        aria-label="Next project page"
                    >
                        <svg className="progress-ring" width="56" height="56">
                            <circle className="progress-ring__circle-bg" cx="28" cy="28" r="24" />
                            <circle 
                                className="progress-ring__circle" 
                                cx="28" 
                                cy="28" 
                                r="24" 
                                strokeDasharray="151"
                                strokeDashoffset={151 - (151 * scrollProgress)} 
                            />
                        </svg>
                        <FiArrowRight className="nav-icon" />
                    </button>
                </div>

                <div className="portfolio__progress-container">
                    <div className="portfolio__progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
                </div>

                <div className="portfolio__progress-info">
                    {String(activePageIndex + 1).padStart(2, '0')} / {String(pageIndices.length).padStart(2, '0')}
                </div>
            </div>
        </section>
    )
}

export default Portfolio