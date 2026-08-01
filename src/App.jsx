import React from 'react'
import VideoIntro from './components/videoIntro/VideoIntro'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
// import Services from './components/services/Services'
import Portfolio from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import Timeline from './components/timeline/timeline'

const App = () => {
    return (
        <>
            <VideoIntro />
            <Nav />
            <About />
            <Timeline />    
            <Experience />
            {/* <Services /> */}
            <Portfolio />
            <Testimonials />
            <Contact />
            <Footer />
        </>
    )
}

export default App