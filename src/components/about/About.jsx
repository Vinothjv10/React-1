import React from 'react';
import './about.css';
import ME from '../../assets/me-about.jpg';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc'

const About = () => {
    return (
        <section id='about'>
            <h5>Get To Know</h5>
            <h2>About Me</h2>
            <div className="container about__container">
                <div className="about__me">
                    <div className="about__me-image">
                        <img src={ME} alt="loading" />

                    </div>
                </div>

                <div className="about__content">
                    <div className="about__cards">
                        <article className='about__card'>
                            <FaAward className='about__icon' />
                            <h5>Experience</h5>
                            <small>3+ Years Working</small>
                        </article>

                        <article className='about__card'>
                            <FiUsers className='about__icon' />
                            <h5>Clients</h5>
                            <small>200+ Worldwide</small>
                        </article>

                        <article className='about__card'>
                            <VscFolderLibrary className='about__icon' />
                            <h5>Projects</h5>
                            <small>80+ Completed</small>
                        </article>

                    </div>

                    <p>
                        As an SDE in ML Ops & Data Platform you will work closely with the Data Science & ML team to bring models to life for end users. You will also work with the Data Engineering team to code on top of databases that manage databases. You will talk about infrastructure, architecture, latency, scale, impact & cost to Nerds who build models and Devs who write Pipelines.

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