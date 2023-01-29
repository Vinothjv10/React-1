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
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR2,
        name: 'Technoblaze',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR3,
        name: 'Spot Plant',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR4,
        name: 'Bisnes Company',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR5,
        name: 'Shiksha',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR6,
        name: 'HoneyComb Site-2',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
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