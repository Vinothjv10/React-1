import React from 'react';
import './about.css';
import ME from '../../assets/IMG_3196-new.jpg';
import { FaAward } from 'react-icons/fa';
import { TbCertificate } from 'react-icons/tb';
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
                            <VscFolderLibrary className='about__icon' />
                            <h5>Experience</h5>
                            <small>2+ Years Working</small>
                        </article>

                        <article className='about__card'>
                            <TbCertificate className='about__icon' />
                            <h5>Microsoft Certificates</h5>
                            <div className="tags-container">
                                <small>DP-100</small>
                                <small>DP-600</small>
                                <small>DP-700</small>
                            </div>
                        </article>

                        <article className='about__card'>
                            <FaAward className='about__icon' />
                            <h5>Awards</h5>
                            <div className="tags-container">
                                <small>Budding Star : 2025</small>
                                <small> Rookie Trophy : 2024</small>
                            </div>
                        </article>

                    </div>
                    <div className="">
                        <div className='content-p'>
                        Big Data Engineer with hands-on experience in designing, implementing, and optimizing scalable data solutions to solve real-world business challenges.
                        </div>
                        <div className='content-p'>
                        Passionate about leveraging data to drive insights and foster innovation, I bring a strong blend of technical expertise, problem-solving skills, and leadership. My work spans building robust data pipelines, enabling advanced analytics, and collaborating with cross-functional teams to deliver impactful results.
                        </div>
                        <div className='content-p'>
                        Proficient in Big Data technologies, cloud platforms, and programming languages, I continue to focus on efficient data processing, large-scale transformations, and secure architecture practices. I’m driven by the goal of helping organizations unlock their potential through data in today’s digital world.
                        </div>
                    </div>

                    <a href="#contact" className='btn btn-primary'>
                        Let's Talk
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About