import React from 'react'
import './testimonials.css'

import AVTR1 from '../../assets/avatar1.jpg';
import AVTR2 from '../../assets/avatar2.jpg';
import AVTR3 from '../../assets/avatar3.jpg';
import AVTR4 from '../../assets/avatar4.jpg';

import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const data = [
    {
        avatar: AVTR1,
        name: 'sdfsfsd',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR2,
        name: 'sdfsfsd',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR3,
        name: 'sdfsfsd',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
    {
        avatar: AVTR4,
        name: 'sdfsfsd',
        review: 'Your responses will have no impact on your status as a current or future job applicant. Data collected through this survey is confidential and will not be shared with those responsible for making hiring decisions. Be sure to stay connected to Verizon and check out our Career areas, Verizon Works Careers blog, and Up to Speed daily news program for employees.'
    },
]

const Testimonials = () => {
    return (
        <section id='testimonials'>
            <h5>Review from Clients</h5>
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