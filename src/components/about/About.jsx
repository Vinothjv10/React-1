import React from 'react';
import './about.css';
import ME from '../../assets/me-about-2.jpg';
import { FaAward } from 'react-icons/fa';
import { TbCertificate } from 'react-icons/tb';
// import { VscFolderLibrary } from 'react-icons/vsc'

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
                            <small>2+ Years Working</small>
                        </article>

                        <article className='about__card'>
                            <TbCertificate className='about__icon' />
                            <h5>Microsoft Certificates</h5>
                            <div className="tags-container">
                                <small>DP-100</small>
                                <small>DP-600</small>
                                <small>AZ-400</small>
                            </div>
                        </article>

                        {/* <article className='about__card'>
                            <VscFolderLibrary className='about__icon' />
                            <h5>Projects</h5>
                            <small>6+ Completed</small>
                        </article> */}

                    </div>
                    <div className="">
                        <div className='content-p'>
                        I am currently working as a Big Data Engineer at Saturam. I have earned Microsoft certifications DP-100: Azure Data Scientist Associate (intermediate level), DP-600: Fabric Analytics Engineer Associate (intermediate level), and AZ-400: Designing and Implementing Microsoft DevOps Solutions (expert level). My expertise lies in CI/CD deployment and ETL processing, with a strong understanding of data.

                        </div>
                        <div className='content-p'>
                        With 1.2 years of work experience in Full-stack development at Honeycomb Technologies, I have worked with various real-time frameworks, including ReactJs, AngularJS, and NextJS. My current passion is in the field of data engineering, where I am continuously learning and exploring numerous tools and technologies.

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