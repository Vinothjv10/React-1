import React from 'react'
import './portfolio.css';
import IMG0 from '../../assets/project/bot.gif';
import IMG1 from '../../assets/project/honeycomb.png';
import IMG2 from '../../assets/project/cilogo.png';
import IMG3 from '../../assets/project/spot-plant.png';
import IMG4 from '../../assets/project/bisnes.png';
import IMG5 from '../../assets/project/honeycomb.png';
import IMG6 from '../../assets/project/logo.png';
import IMG7 from '../../assets/project/goshula.png';


const data = [
    {
        id: 0,
        image: IMG0,
        title: 'Newsnip AI',
        github: 'https://github.com/Vinothjv10/Newsnip-AI',
        demo: 'https://newsnip.netlify.app/'
    },
    {
        id: 1,
        image: IMG1,
        title: 'Honeycomb Site',
        github: 'https://github.com/Vinothjv10/honeycomb-site',
        demo: 'https://www.honeycombtech.org/'
    },
    {
        id: 2,
        image: IMG2,
        title: 'Technoblaze',
        github: 'https://github.com/Vinothjv10/technoblaze',
        demo: 'https://technoblaze.netlify.app/'
    },
    {
        id: 3,
        image: IMG3,
        title: 'Spot Plant',
        github: 'https://github.com/Plants-Site/Spot-plant',
        demo: 'https://plant-6cd6e.web.app/'
    },
    {
        id: 4,
        image: IMG4,
        title: 'Bisnes Company',
        github: 'https://github.com/Vinothjv10/front_end_page',
        demo: 'https://company-jv.web.app/'
    },
    {
        id: 5,
        image: IMG5,
        title: 'Honeycomb Site-2',
        github: 'https://github.com/Vinothjv10/WT-A1',
        demo: 'https://companysite-1d719.web.app/'
    },
    {
        id: 6,
        image: IMG6,
        title: 'Shiksha',
        github: 'https://github.com/Vinothjv10/Shiksha',
        demo: 'https://shiksha-jv.netlify.app/'
    },
    {
        id: 7,
        image: IMG7,
        title: 'Goshala',
        github: 'https://github.com/Vinothjv10/Goshala',
        demo: ' '
    },
]


const portfolio = () => {
    return (
        <section id='portfolio'>
            <h5>My Recent Work</h5>
            <h2>Projects</h2>

            <div className="container portfolio__container">
                {
                    data.map(({ id, image, title, github, demo }) => {
                        return (
                            <article key={id} className='portfolio__item'>
                                <div className="portfolio__item-image">
                                    <img className='image' src={image} alt={title} />
                                </div>

                                <h3>{title}</h3>
                                <div className="portfolio__item-cta">
                                    <a href={github} className='btn' target=' _blank'>Github</a>
                                    <a href={demo} className='btn btn-primary' target=' _blank'> Live Demo</a>
                                </div>
                            </article>
                        )
                    })
                }
                {/*   <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article>

                <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article>

                <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article>

                <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article>

                <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article>

                <article className='portfolio__item'>
                    <div className="portfolio__item-image">
                        <img src={IMG1} alt="" />
                    </div>

                    <h3>This is a portfolio item title</h3>
                    <div className="portfolio__item-cta">
                        <a href="" className='btn' target='_blank'>Github</a>
                        <a href="" className='btn btn-primary' target='_blank'> Live Demo</a>
                    </div>
                </article> */}
            </div>
        </section>
    )
}

export default portfolio