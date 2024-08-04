import * as React from 'react';
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

export default function CustomizedTimeline() {
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
            <TimelineDot>
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              College Start
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">Started my college journey</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="rgba(255, 255, 255, 0.6)"
          >
            Aug 2021 - Sep 2022  (1.2 years)
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ minHeight: '20px' }} />
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Software Developer (Internship)
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)" >Honeycomb Technologies </Typography>
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
            <TimelineDot color="primary" variant="outlined">
              <GraduationIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main', minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              College Completion
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)">Graduated with a degree in Computer Science</Typography>
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
            <TimelineDot color="secondary">
              <EngineeringIcon />
            </TimelineDot>
            <TimelineConnector sx={{ minHeight: '20px' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Current Work
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.6)" >Big Data Engineer at Saturam</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  );
}
