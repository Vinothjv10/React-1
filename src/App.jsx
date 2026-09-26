import React from 'react'
import VideoIntro from './components/videoIntro/VideoIntro'
import Bio from './components/bio/Bio'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
// import Services from './components/services/Services'
import Portfolio from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import Timeline from './components/timeline/timeline'

import { ThemeProvider } from './context/ThemeContext'
import ParticleBackground from './components/background/ParticleBackground'
import ThemeToggle from './components/themeToggle/ThemeToggle'
import Cursor from './components/effects/Cursor'
import useLenis from './hooks/useLenis'
import useMagnetic from './hooks/useMagnetic'
import useTilt from './hooks/useTilt'

// Cards that get the 3D hover tilt. Chosen so they don't clash with existing CSS transforms.
const TILT_TARGETS = '.about__card, .contact__option, .timeline__card, .skill-card, .stat-card, .portfolio__item-image'

const Effects = () => {
    useLenis()
    useMagnetic()
    useTilt(TILT_TARGETS)
    return null
}

const App = () => {
    return (
        <ThemeProvider>
            <ParticleBackground />
            <ThemeToggle />
            <Cursor />
            <Effects />

            <div className="site-content">
                <VideoIntro />
                <Bio />
                <Nav />
                <About />
                <Timeline />
                <Experience />
                {/* <Services /> */}
                <Portfolio />
                <Testimonials />
                <Contact />
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App
