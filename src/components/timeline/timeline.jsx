import React, { useState, useEffect, useRef } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import GraduationIcon from '@mui/icons-material/School';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Typography from '@mui/material/Typography';
import './timeline.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const itemsList = ['college', 'internship', 'graduation', 'current'];

export default function CustomizedTimeline() {
  const [activeItem, setActiveItem] = useState('college'); // Starts on the first card
  const [hoverItem, setHoverItem] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);


  // Staggered scroll entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(el.querySelectorAll('.MuiTimelineItem-root'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'restart reset restart reset'
        }
      }
    );
  }, []);

  // Autoplay cycle effect: advances the active card every 3 seconds
  useEffect(() => {
    if (isPaused || hoverItem !== null) return;

    const interval = setInterval(() => {
      setActiveItem((prev) => {
        const currentIndex = itemsList.indexOf(prev);
        const nextIndex = (currentIndex + 1) % itemsList.length;
        return itemsList[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, hoverItem]);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const handleMouseEnter = (item) => {
    setHoverItem(item);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setHoverItem(null);
    setIsPaused(false);
  };

  // Helper function to split comma-separated skills into clean styled badges
  const renderSkills = (skillsString) => {
    return skillsString.split(',').map((skill, index) => (
      <span key={index} className="timeline__skill-chip">
        {skill.trim()}
      </span>
    ));
  };

  return (
    <section id="timeline" className="timeline-section" ref={sectionRef}>
      <div className="timeline-glow-1"></div>
      <div className="timeline-glow-2"></div>
      <h2>TIMELINE</h2>

      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
          >
            Sept 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector className={activeItem === 'college' || hoverItem === 'college' ? 'highlighted' : ''} />
            <TimelineDot 
              className={`${activeItem === 'college' ? 'active' : ''} ${hoverItem === 'college' ? 'hovered' : ''}`}
              onClick={() => handleClick('college')}
              onMouseEnter={() => handleMouseEnter('college')}
              onMouseLeave={handleMouseLeave}
            >
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector className={activeItem === 'college' || hoverItem === 'college' ? 'highlighted' : ''} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <div 
              className={`timeline__card ${activeItem === 'college' ? 'active' : ''} ${hoverItem === 'college' ? 'hovered' : ''}`}
              onClick={() => handleClick('college')}
              onMouseEnter={() => handleMouseEnter('college')}
              onMouseLeave={handleMouseLeave}
            >
              <Typography variant="h6" component="div" className="timeline__card-title">
                Government College of Engineering, Salem
              </Typography>
              <Typography className="timeline__card-subtitle">
                Computer Science & Engineering
              </Typography>
              <Typography className="timeline__card-description">
                Began my undergraduate journey in engineering, laying down core foundations in software and computing concepts.
              </Typography>
              <div className="timeline__skills">
                {renderSkills("C, C++, Data Structures, Algorithms, Computer Architecture, Digital Electronics")}
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
          >
            Aug 2021 - Sep 2022 (1.2 years)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector className={activeItem === 'internship' || hoverItem === 'internship' ? 'highlighted' : ''} />
            <TimelineDot 
              className={`${activeItem === 'internship' ? 'active' : ''} ${hoverItem === 'internship' ? 'hovered' : ''}`}
              onClick={() => handleClick('internship')}
              onMouseEnter={() => handleMouseEnter('internship')}
              onMouseLeave={handleMouseLeave}
            >
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector className={activeItem === 'internship' || hoverItem === 'internship' ? 'highlighted' : ''} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <div 
              className={`timeline__card ${activeItem === 'internship' ? 'active' : ''} ${hoverItem === 'internship' ? 'hovered' : ''}`}
              onClick={() => handleClick('internship')}
              onMouseEnter={() => handleMouseEnter('internship')}
              onMouseLeave={handleMouseLeave}
            >
              <Typography variant="h6" component="div" className="timeline__card-title">
                Honeycomb Technologies
              </Typography>
              <Typography className="timeline__card-subtitle">
                Software Developer (Internship)
              </Typography>
              <Typography className="timeline__card-description">
                Developed web interfaces and full-stack utilities, participating in agile sprint schedules.
              </Typography>
              <div className="timeline__skills">
                {renderSkills("NextJS, ReactJS, AngularJS, Firebase, JavaScript, Figma, NodeJS, Bootstrap, Tailwind, HTML, CSS, MySQL, SQL, Python, Cloud Firestore, GitHub, GitLens, Jira, Agile SDLC")}
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
          >
            March 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector className={activeItem === 'graduation' || hoverItem === 'graduation' ? 'highlighted' : ''} />
            <TimelineDot 
              className={`${activeItem === 'graduation' ? 'active' : ''} ${hoverItem === 'graduation' ? 'hovered' : ''}`}
              onClick={() => handleClick('graduation')}
              onMouseEnter={() => handleMouseEnter('graduation')}
              onMouseLeave={handleMouseLeave}
            >
              <GraduationIcon />
            </TimelineDot>
            <TimelineConnector className={activeItem === 'graduation' || hoverItem === 'graduation' ? 'highlighted' : ''} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <div 
              className={`timeline__card ${activeItem === 'graduation' ? 'active' : ''} ${hoverItem === 'graduation' ? 'hovered' : ''}`}
              onClick={() => handleClick('graduation')}
              onMouseEnter={() => handleMouseEnter('graduation')}
              onMouseLeave={handleMouseLeave}
            >
              <Typography variant="h6" component="div" className="timeline__card-title">
                Government College of Engineering, Salem
              </Typography>
              <Typography className="timeline__card-subtitle">
                Computer Science Graduate
              </Typography>
              <Typography className="timeline__card-description">
                Graduated with a Bachelor's Degree in Computer Science Engineering, mastering database systems and software engineering.
              </Typography>
              <div className="timeline__skills">
                {renderSkills("Advanced Programming, Database Management, Artificial Intelligence, Software Testing, SDLC")}
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
          >
            Aug 2023 - Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector className={activeItem === 'current' || hoverItem === 'current' ? 'highlighted' : ''} />
            <TimelineDot 
              className={`${activeItem === 'current' ? 'active' : ''} ${hoverItem === 'current' ? 'hovered' : ''}`}
              onClick={() => handleClick('current')}
              onMouseEnter={() => handleMouseEnter('current')}
              onMouseLeave={handleMouseLeave}
            >
              <EngineeringIcon />
            </TimelineDot>
            <TimelineConnector className={activeItem === 'current' || hoverItem === 'current' ? 'highlighted' : ''} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <div 
              className={`timeline__card ${activeItem === 'current' ? 'active' : ''} ${hoverItem === 'current' ? 'hovered' : ''}`}
              onClick={() => handleClick('current')}
              onMouseEnter={() => handleMouseEnter('current')}
              onMouseLeave={handleMouseLeave}
            >
              <Typography variant="h6" component="div" className="timeline__card-title">
                Saturam
              </Typography>
              <Typography className="timeline__card-subtitle">
                Big Data Engineer
              </Typography>
              <Typography className="timeline__card-description">
                Designing, deploying, and maintaining secure Big Data storage, analytical ETL solutions, and workflow orchestrations.
              </Typography>
              <div className="timeline__skills">
                {renderSkills("SQL (MySQL, PostgreSQL, MSSQL), Azure, ADF, Synapse, PowerBI, Fabric, ETL, Airflow, Python, Version Control, Data Lakehouse")}
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  );
}
