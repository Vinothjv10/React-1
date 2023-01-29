import React from 'react'
import './footer.css'

import { BsWhatsapp } from 'react-icons/bs';
import { FiInstagram } from 'react-icons/fi'
import { IoLogoTwitter } from 'react-icons/io'

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
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>

                </ul>

                <div className="footor__socials">
                    <a href="https://wa.me/9385506326" target=" _blank"><BsWhatsapp /></a>
                    <a href="https://www.instagram.com/i_m_vinoth__/"><FiInstagram /></a>
                    <a href="https://twitter.com/Vinoth__J"><IoLogoTwitter /></a>
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