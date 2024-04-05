import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddEvent from "../components/AddEvent.tsx";
import {Container} from "@mui/material";
import DateHeader from "../components/DateHeader.tsx";
import DailyTaskChain from "../components/DailyTaskChain.tsx";
import {useState} from "react";

export default function HomeView() {
    const [selectedDate, setSelectedDate] = useState(new Date());


    return (
        <>
            <DateHeader selectedDate={selectedDate} onDateSelect={setSelectedDate}/>
            <DailyTaskChain selectedDate={selectedDate} />
            <AddEvent/>
        </>


    );
}
