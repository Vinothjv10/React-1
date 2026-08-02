import React, { useEffect, useRef } from 'react'
import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLinkedinBoxFill } from 'react-icons/ri'
import { BsWhatsapp } from 'react-icons/bs'
import emailjs from 'emailjs-com';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const form = useRef();
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelectorAll('.contact__option'),
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
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

        gsap.fromTo(el.querySelector('form'),
            { opacity: 0, x: 40 },
            {
                opacity: 1,
                x: 0,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'restart reset restart reset'
                }
            }
        );
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_hemqzii', 'template_8yug0ca', form.current, 'C2Ognrigx7g4n3Z12')

        window.alert("✨🎊 Message Send Successfully 🎊✨")
        e.target.reset()

    };

    return (
        <section id='contact' ref={sectionRef}>
            <h5>Get In Touch</h5>
            <h2>Contact Me</h2>

            <div className="container contact__container">
                <div className="contact__options">
                    <article className='contact__option'>
                        <MdOutlineEmail className='contact__option-icon' />
                        <h4>Email</h4>
                        <h5>vinothjv10@gmail.com</h5>
                        <a href="mailto:vinothjv10@gmail.com" target=" _blank">Message me</a>
                    </article>

                    <article className='contact__option'>
                        <RiLinkedinBoxFill className='contact__option-icon' />
                        <h4>LinkedIn</h4>
                        <h5>vinothjv</h5>
                        <a href="https://www.linkedin.com/in/vinothjv/" target=" _blank">Message me</a>
                    </article>

                    <article className='contact__option'>
                        <BsWhatsapp className='contact__option-icon' />
                        <h4>Whatsapp</h4>
                        <h5>+91-9385506326</h5>
                        <a href="https://wa.me/9385506326" target=" _blank">Message me</a>
                    </article>
                </div>

                {/* End of Contact Options */}

                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name='name' placeholder='Your Full Name' required />
                    <input type="text" name='email' placeholder='Your email' required />
                    <textarea name="message" rows="7" placeholder='Your Message' required></textarea>

                    <button type='submit' className='btn btn-primary'>Send a Message</button>
                </form>

            </div>
        </section >
    )
}

export default Contact