import React, { useState } from 'react';
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
import './timeline.css'

export default function CustomizedTimeline() {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  const clickableStyle = {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  return (
    <section className="">
      <h2>TIMELINE</h2>

      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="rgba(255, 255, 255, 0.6)"
          >
            Sept 2019
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ minHeight: '20px' }} />
            <TimelineDot onClick={() => handleClick('college')}>
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="h6"
              component="span"
              onClick={() => handleClick('college')}
              // sx={clickableStyle}
            >
              College Start
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">
              Started my college journey
            </Typography>
            {/* {activeItem === 'college' && (
              <Typography color="rgba(255, 255, 255, 0.6)">Skills</Typography>
            )} */}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="rgba(255, 255, 255, 0.6)"
          >
            Aug 2021 - Sep 2022 (1.2 years)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ minHeight: '20px' }} />
            <TimelineDot color="primary" onClick={() => handleClick('internship')}>
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="h6"
              component="span"
              onClick={() => handleClick('internship')}
              sx={clickableStyle}
            >
              Software Developer (Internship)
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">
              Honeycomb Technologies
            </Typography>
            {activeItem === 'internship' && (
              <Typography color="rgba(255, 255, 255, 0.6)">
                <p className='space'>
                 NextJS,
                 ReactJS, AngularJS, Firebase, JavaScript,  NodeJS, Bootstrap, Tailwind, HTML, CSS,
                 MySQL, SQL,Python, Cloud Firestore,
                 GitHub, GitLens, Jira,
                 Agile Methodologies, Software Development Life Cycle (SDLC)
                </p>
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="rgba(255, 255, 255, 0.6)"
          >
            March 2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ minHeight: '20px' }} />
            <TimelineDot color="primary" variant="outlined" onClick={() => handleClick('graduation')}>
              <GraduationIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main', minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="h6"
              component="span"
              onClick={() => handleClick('graduation')}
              sx={clickableStyle}
            >
              College Completion
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">
              Graduated with a degree in Computer Science
            </Typography>
            {activeItem === 'graduation' && (
              <Typography color="rgba(255, 255, 255, 0.6)">
                <p className='space'>Advanced Programming, Database Management, AI, SDLC</p>
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="rgba(255, 255, 255, 0.6)"
          >
            Aug 2023 - Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main', minHeight: '20px' }} />
            <TimelineDot color="secondary" onClick={() => handleClick('current')}>
              <EngineeringIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography
              variant="h6"
              component="span"
              onClick={() => handleClick('current')}
              sx={clickableStyle}
            >
              Current Work
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">
              Big Data Engineer at Saturam
            </Typography>
            {activeItem === 'current' && (
              <Typography color="rgba(255, 255, 255, 0.6)">
                <p className='space'>
                  SQL (MySQL, PostgreSQL, MSSQL), Azure, ADF, Synapse, Microsoft-Fabric, ETL, Airflow, Python, Version control
                </p>
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  );
}
