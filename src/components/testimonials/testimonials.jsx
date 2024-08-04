import React from 'react'
import './testimonials.css'

import AVTR1 from '../../assets/project/honeycomb.png';
import AVTR2 from '../../assets/project/cilogo.png';
import AVTR3 from '../../assets/project/spot-plant.png';
import AVTR4 from '../../assets/project/bisnes.png';
import AVTR5 from '../../assets/project/logo.png';
import AVTR6 from '../../assets/project/honeycomb.png';


import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const data = [
    {
        avatar: AVTR1,
        name: 'HoneyComb',
        review: 'This jobseeker website is a platform that connects job seekers with potential employers. The website typically provides a job board where employers can post job openings, and job seekers can search and apply for these positions. The homepage should introduce the website and highlight its main features. This page could include a search bar where job seekers can enter keywords and location to find relevant job listings.'
    },
    {
        avatar: AVTR2,
        name: 'Technoblaze',
        review: 'This college symposium website is a platform that provides information about a college symposium event. The website typically contains information about the symposium, including the theme, date, location, speakers, and schedule. he homepage should introduce the symposium and highlight its main features. This page could include a brief overview of the symposium theme, and a call to action to register for the event.'
    },
    {
        avatar: AVTR3,
        name: 'Spot Plant',
        review: 'This PlantSale website is a platform that allows customers to browse and purchase plants and related products online. The website typically contains information about the plants available for sale, including their descriptions, prices, and images. The homepage should introduce the website and highlight its main features. This page could include a slideshow of the plants for sale, and a call to action to browse the available products.'
    },
    {
        avatar: AVTR4,
        name: 'Bisnes Company',
        review: 'This company website is a platform that provides information about a company products, services, and values. The website typically contains information about the company history, mission, and vision, as well as its team members, products and services, and contact information. This page could include a brief overview of the company mission and values, and a call to action to learn more about its products or services.'
    },
    {
        avatar: AVTR5,
        name: 'Shiksha',
        review: 'This school website is a platform that provides information about a school academic programs, facilities, and student life. The website typically contains information about the school history, mission, and vision, as well as its curriculum, extracurricular activities, and contact information. This page could include a brief overview of the school mission and values, and a call to action to learn more about its programs and facilities.'
    },
    {
        avatar: AVTR6,
        name: 'HoneyComb Site-2',
        review: 'The homepage of the website typically introduces the company and highlights its main products or services. This page might feature a slideshow of images or videos showcasing the company offerings, or a call to action inviting visitors to learn more. This section provides contact information for the company, including email addresses, phone numbers, and social media handles. Visitors can use this information to ask questions, provide feedback, or get help with any issues they may encounter'
    },
]

const Testimonials = () => {
    return (
        <section id='testimonials'>
            <h5>Description for Projects</h5>
            <h2>Testimonials</h2>

            <Swiper className="container testimonials__container"
                // install Swiper modules
                modules={[Pagination]}
                spaceBetween={40}   
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {
                    data.map(({ avatar, name, review }, index) => {
                        return (
                            <SwiperSlide key={index} className='testimonial'>
                                <div className="client__avatar">
                                    <img src={avatar} alt="Avatar one" />

                                </div>
                                <h5 className='client__name'>{name}</h5>
                                <small className='client__review'>
                                    {review}
                                </small>
                            </SwiperSlide>
                        )
                    })
                }

                {/* <article className='testimonial'>
                    <div className="client__avatar">
                        <img src={AVTR1} alt="Avatar one" />

                    </div>
                    <h5 className='client__name'>dfsdfsa</h5>
                    <small className='client__review'>
                        Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.
                    </small>
                </article>

                <article className='testimonial'>
                    <div className="client__avatar">
                        <img src={AVTR2} alt="Avatar one" />

                    </div>
                    <h5 className='client__name'>dfsdfsa</h5>
                    <small className='client__review'>
                        Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.
                    </small>
                </article>

                <article className='testimonial'>
                    <div className="client__avatar">
                        <img src={AVTR3} alt="Avatar one" />

                    </div>
                    <h5 className='client__name'>dfsdfsa</h5>
                    <small className='client__review'>
                        Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.
                    </small>
                </article>

                <article className='testimonial'>
                    <div className="client__avatar">
                        <img src={AVTR4} alt="Avatar one" />

                    </div>
                    <h5 className='client__name'>dfsdfsa</h5>
                    <small className='client__review'>
                        Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.
                    </small>
                </article> */}

            </Swiper>
        </section>
    )
}

export default Testimonials