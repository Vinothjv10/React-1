import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa'



const HeaderSocials = () => {
    return (
        <div className='header__socials'>
            <a href="https://www.linkedin.com/in/vinothjv/" target="#"> <BsLinkedin /> </a>
            <a href="https://github.com/Vinothjv10" target="#"><FaGithub /></a>
            <a href="https://www.instagram.com/i_m_vinoth__/" target="#"><FaInstagram /></a>
        </div>
    )
}

export default HeaderSocials