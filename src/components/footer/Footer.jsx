import React from 'react'
import './footer.css'

import { BsWhatsapp } from 'react-icons/bs';
import { FiInstagram } from 'react-icons/fi'
import { IoLogoTwitter } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';


const Footer = () => {
    return (
        <div>
            <footer>
                <a href=" #" className='footor__logo'>JV</a>

                <ul className='permalinks'>
                    <li><a href=" #">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#experience">Experience</a></li>
                    {/* <li><a href="#services">Services</a></li> */}
                    <li><a href="#portfolio">Projects</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>

                </ul>

                <div className="footor__socials">
                    <a href="https://wa.me/9385506326" target=" _blank"><BsWhatsapp /></a>
                    <a href="https://www.instagram.com/i_m_vinoth__/" target=" _blank"><FiInstagram /></a>
                    <a href="https://twitter.com/Vinoth__J" target=" _blank"><IoLogoTwitter /></a>
                    <a href="https://github.com/Vinothjv10" target=" _blank"><FaGithub /></a>
                </div>

                <div className="footer__copyright">
                    <small>
                        &copy; Vinoth J. All rights reserviced
                    </small>
                </div>
            </footer>
        </div>
    )
}

export default Footer