import React, { useEffect, useRef, useState } from 'react';
import './contact.css';
import { MdOutlineEmail, MdOutlineContentCopy } from 'react-icons/md';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { BsWhatsapp } from 'react-icons/bs';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheck, FiExternalLink } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const form = useRef();
    const sectionRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Reset elements initially to avoid flash of content
        gsap.set(el.querySelectorAll('.contact__title-wrap h5, .contact__title-wrap h2, .contact__option, .contact__form-card'), {
            opacity: 0,
            y: 35
        });

        // Title Animation
        gsap.fromTo(el.querySelectorAll('.contact__title-wrap h5, .contact__title-wrap h2'),
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'restart reset restart reset'
                }
            }
        );

        // Contact Option Cards Animation
        gsap.fromTo(el.querySelectorAll('.contact__option'),
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'restart reset restart reset'
                }
            }
        );

        // Form Card Animation
        gsap.fromTo(el.querySelector('.contact__form-card'),
            { opacity: 0, x: 50, scale: 0.98 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1.0,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'restart reset restart reset'
                }
            }
        );
    }, []);

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'email') {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } else if (type === 'whatsapp') {
            setCopiedWhatsapp(true);
            setTimeout(() => setCopiedWhatsapp(false), 2000);
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm('service_hemqzii', 'template_8yug0ca', form.current, 'C2Ognrigx7g4n3Z12')
            .then((result) => {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            }, (error) => {
                console.error(error);
                setStatus('error');
            });
    };

    return (
        <section id='contact' ref={sectionRef}>
            <div className="contact__title-wrap">
                <h5>Get In Touch</h5>
                <h2>Contact Me</h2>
            </div>

            <div className="container contact__container">
                <div className="contact__options">
                    <article className='contact__option'>
                        <div className="contact__option-header">
                            <div className="contact__option-icon-box">
                                <MdOutlineEmail className='contact__option-icon' />
                            </div>
                            <div className="contact__option-info">
                                <h4>Email</h4>
                                <h5>vinothjv10@gmail.com</h5>
                            </div>
                        </div>
                        <div className="contact__option-actions">
                            <a href="mailto:vinothjv10@gmail.com" target="_blank" rel="noreferrer" className="contact__action-btn main">
                                Message me <FiExternalLink className="btn-icon-right" />
                            </a>
                            <button 
                                type="button" 
                                onClick={() => handleCopy('vinothjv10@gmail.com', 'email')} 
                                className={`contact__action-btn copy ${copiedEmail ? 'copied' : ''}`}
                            >
                                {copiedEmail ? <FiCheck className="btn-icon" /> : <MdOutlineContentCopy className="btn-icon" />}
                                {copiedEmail ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </article>

                    <article className='contact__option'>
                        <div className="contact__option-header">
                            <div className="contact__option-icon-box">
                                <RiLinkedinBoxFill className='contact__option-icon' />
                            </div>
                            <div className="contact__option-info">
                                <h4>LinkedIn</h4>
                                <h5>vinothjv</h5>
                            </div>
                        </div>
                        <div className="contact__option-actions">
                            <a href="https://www.linkedin.com/in/vinothjv/" target="_blank" rel="noreferrer" className="contact__action-btn main">
                                Connect <FiExternalLink className="btn-icon-right" />
                            </a>
                        </div>
                    </article>

                    <article className='contact__option'>
                        <div className="contact__option-header">
                            <div className="contact__option-icon-box">
                                <BsWhatsapp className='contact__option-icon' />
                            </div>
                            <div className="contact__option-info">
                                <h4>Whatsapp</h4>
                                <h5>+91-9385506326</h5>
                            </div>
                        </div>
                        <div className="contact__option-actions">
                            <a href="https://wa.me/9385506326" target="_blank" rel="noreferrer" className="contact__action-btn main">
                                WhatsApp me <FiExternalLink className="btn-icon-right" />
                            </a>
                            <button 
                                type="button" 
                                onClick={() => handleCopy('+919385506326', 'whatsapp')} 
                                className={`contact__action-btn copy ${copiedWhatsapp ? 'copied' : ''}`}
                            >
                                {copiedWhatsapp ? <FiCheck className="btn-icon" /> : <MdOutlineContentCopy className="btn-icon" />}
                                {copiedWhatsapp ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </article>
                </div>

                {/* End of Contact Options */}

                <div className="contact__form-card">
                    <form ref={form} onSubmit={sendEmail}>
                        {status === 'idle' && (
                            <>
                                <h3 className="form__title">Send a Message</h3>
                                <div className="form__group">
                                    <div className="input__wrapper">
                                        <FiUser className="input__icon" />
                                        <input 
                                            type="text" 
                                            name='name' 
                                            placeholder='Your Full Name' 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form__group">
                                    <div className="input__wrapper">
                                        <FiMail className="input__icon" />
                                        <input 
                                            type="email" 
                                            name='email' 
                                            placeholder='Your Email' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form__group">
                                    <div className="input__wrapper textarea__wrapper">
                                        <FiMessageSquare className="input__icon" />
                                        <textarea 
                                            name="message" 
                                            rows="5" 
                                            placeholder='Your Message' 
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <button type='submit' className='btn btn-primary submit__btn'>
                                    Send Message <FiSend className="btn-icon-right" />
                                </button>
                            </>
                        )}

                        {status === 'sending' && (
                            <div className="form__status form__status--sending">
                                <div className="spinner"></div>
                                <h3>Transmitting Link...</h3>
                                <p>Securing connection & establishing handshakes with vinothjv10@gmail.com</p>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="form__status form__status--success">
                                <div className="status__icon-circle success">
                                    <FiCheck className="status__icon" />
                                </div>
                                <h3>Message Transmitted!</h3>
                                <p>Thank you! Your message has been sent successfully. I will get back to you shortly.</p>
                                <button type="button" className="btn btn-primary" onClick={() => setStatus('idle')}>
                                    Send Another Message
                                </button>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="form__status form__status--error">
                                <div className="status__icon-circle error">
                                    <span className="status__icon-cross">✕</span>
                                </div>
                                <h3>Transmission Interrupted</h3>
                                <p>Could not send message over secure link. Please try again or copy my email address to contact me directly.</p>
                                <button type="button" className="btn btn-primary" onClick={() => setStatus('idle')}>
                                    Try Again
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;