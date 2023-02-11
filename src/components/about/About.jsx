import React from 'react';
import './about.css';
import ME from '../../assets/me-about-2.jpg';
import { FaAward } from 'react-icons/fa';
// import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc'

const About = () => {
    return (
        <section id='about'>
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
                            <FaAward className='about__icon' />
                            <h5>Experience</h5>
                            <small>1+ Years Working</small>
                        </article>

                        {/* <article className='about__card'>
                            <FiUsers className='about__icon' />
                            <h5>Clients</h5>
                            <small>200+ Worldwide</small>
                        </article> */}

                        <article className='about__card'>
                            <VscFolderLibrary className='about__icon' />
                            <h5>Projects</h5>
                            <small>6+ Completed</small>
                        </article>

                    </div>

                    <p>
                        I currently purshing my B.E Computer Science and Engineering in Government College of Engineering at Salem. I have 6 months of experience as MEAN stack and I have 6 month internship complete on Honeycomb Technology at OH (Virtual Mode). I am a self-motivated person and talkative. My short-term goal is to get a job in a reputed company where I can build my career and help organizations too.

                    </p>

                    <a href="#contact" className='btn btn-primary'>
                        Let's Talk
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About