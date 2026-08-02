import React, { useState, useEffect } from 'react'
import './footer.css'

import { BsWhatsapp } from 'react-icons/bs';
import { RiLinkedinBoxFill } from 'react-icons/ri'
import { IoLogoTwitter } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';
import { FiMail, FiMapPin, FiClock, FiCopy, FiCheck, FiSend, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
    const [time, setTime] = useState('');
    const [copied, setCopied] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState('idle'); // idle, sending, success

    useEffect(() => {
        const updateClock = () => {
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setTime(new Date().toLocaleTimeString('en-US', options));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('vinothjv10@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setNewsletterStatus('sending');
        setTimeout(() => {
            setNewsletterStatus('success');
            setNewsletterEmail('');
            setTimeout(() => setNewsletterStatus('idle'), 3000);
        }, 1200);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer__glow-ambient"></div>
            <div className="footer__glow-ambient-secondary"></div>
            <div className="footer__grid-pattern"></div>
            
            <div className="container footer__container">
                {/* Column 1: Brand details */}
                <div className="footer__col footer__col-brand">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="footer__logo-badge">
                        <span className="logo-text">JV</span>
                        <span className="logo-dot"></span>
                    </a>
                    <p className="footer__tagline">
                        Designing and developing digital experiences with focus on performance, interaction, and aesthetic excellence.
                    </p>
                    <div className="footer__status">
                        <span className="status-indicator">
                            <span className="status-dot"></span>
                            <span className="status-ping"></span>
                        </span>
                        <span className="status-text">Available for new opportunities</span>
                    </div>
                </div>

                {/* Column 2: Sitemap */}
                <div className="footer__col footer__col-links">
                    <h3 className="footer__col-title">Sitemap</h3>
                    <ul className="footer__links">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#portfolio">Projects</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* Column 3: Connectivity */}
                <div className="footer__col footer__col-connect">
                    <h3 className="footer__col-title">Get in Touch</h3>
                    <div className="footer__info-list">
                        <div className="footer__info-item">
                            <FiMapPin className="info-icon" />
                            <span>Tamil Nadu, India</span>
                        </div>
                        <div className="footer__info-item">
                            <FiClock className="info-icon" />
                            <span className="time-display">{time || '00:00:00 AM'}</span>
                            <span className="time-tz">(IST)</span>
                        </div>
                        <div className="footer__info-item footer__email-wrap">
                            <FiMail className="info-icon" />
                            <span className="email-text">vinothjv10@gmail.com</span>
                            <button 
                                className={`email-copy-btn ${copied ? 'copied' : ''}`}
                                onClick={handleCopyEmail}
                                title="Copy Email Address"
                                aria-label="Copy Email"
                            >
                                {copied ? <FiCheck /> : <FiCopy />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Column 4: Newsletter */}
                <div className="footer__col footer__col-newsletter">
                    <h3 className="footer__col-title">Newsletter</h3>
                    <p className="newsletter-text">Subscribe to get notified about new projects and insights.</p>
                    <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                        <div className="newsletter-input-group">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="newsletter-input"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required
                                disabled={newsletterStatus === 'sending'}
                            />
                            <button 
                                type="submit" 
                                className={`newsletter-submit-btn ${newsletterStatus}`}
                                disabled={newsletterStatus === 'sending'}
                                aria-label="Subscribe"
                            >
                                {newsletterStatus === 'sending' ? (
                                    <span className="spinner"></span>
                                ) : newsletterStatus === 'success' ? (
                                    <FiCheck className="btn-icon-success" />
                                ) : (
                                    <FiSend />
                                )}
                            </button>
                        </div>
                        {newsletterStatus === 'success' && (
                            <span className="newsletter-success-msg">Successfully subscribed!</span>
                        )}
                    </form>
                </div>
            </div>

            <div className="footer__divider-glow">
                <span className="divider-pulse"></span>
            </div>

            {/* Footer Bottom Bar */}
            <div className="container footer__bottom">
                <div className="footer__copyright">
                    <p>&copy; {new Date().getFullYear()} Vinoth J. All rights reserved.</p>
                </div>

                {/* Socials */}
                <div className="footer__socials">
                    <a href="https://wa.me/9385506326" target="_blank" rel="noopener noreferrer" className="social-whatsapp" aria-label="WhatsApp">
                        <BsWhatsapp />
                    </a>
                    <a href="https://www.linkedin.com/in/vinothjv/" target="_blank" rel="noopener noreferrer" className="social-linkedin" aria-label="LinkedIn">
                        <RiLinkedinBoxFill />
                    </a>
                    <a href="https://twitter.com/Vinoth__J" target="_blank" rel="noopener noreferrer" className="social-twitter" aria-label="Twitter">
                        <IoLogoTwitter />
                    </a>
                    <a href="https://github.com/Vinothjv10" target="_blank" rel="noopener noreferrer" className="social-github" aria-label="GitHub">
                        <FaGithub />
                    </a>
                </div>

                <div className="footer__scroll-to-top">
                    <button 
                        className="scroll-btn" 
                        onClick={scrollToTop}
                        aria-label="Scroll to Top"
                    >
                        <FiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;