import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddEvent from "../components/AddEvent.tsx";
import {Box, Container} from "@mui/material";

export default function HomeView() {
  return (
      <Container>
          <Timeline>
              <TimelineItem>
                  <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Eat</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                  <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Code</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                  <TimelineSeparator>
                      <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Sleep</TimelineContent>
              </TimelineItem>
          </Timeline>
          <AddEvent></AddEvent>
      </Container>


  );
}
