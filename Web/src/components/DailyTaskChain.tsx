import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography } from '@mui/material';
import {Task} from "../entity.ts";
import {getEventsJson} from "../utils.tsx";

type DailyTaskChainProps = {
    selectedDate: Date;
};


const DailyTaskChain: React.FC<DailyTaskChainProps> = ({ selectedDate }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedEventsJson = getEventsJson();
        // console.log(storedEventsJson);
        if (storedEventsJson) {
            const storedEvents = JSON.parse(storedEventsJson);
            console.log(storedEvents[0].startTime)
            // Filter tasks for the selected day and sort them
            const dailyTasks = storedEvents.filter((task: { startTime: string | number | Date; }) => {
                const taskDate = new Date(task.startTime).toDateString();
                return taskDate === selectedDate.toDateString();
            }).sort((a: { startTime: string | number | Date; }, b: { startTime: string | number | Date; }) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

            setTasks(dailyTasks);
        }
        // console.log(tasks);
    }, [selectedDate]);
    // if (tasks.length === 0) return null; // Don't render anything if there are no tasks

    return (

        <>
            {/*<h1>heh</h1>*/}
            <Timeline position="alternate">
                {tasks.map((task, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot />
                            {index < tasks.length - 1 && <TimelineConnector />} {/* Only render connector if not the last item */}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6" component="span">
                                {task.title}
                            </Typography>
                            <Typography>{task.location}</Typography>
                            <Typography color="text.secondary">
                                {new Date(task.startTime).toLocaleTimeString()} - {new Date(task.endTime).toLocaleTimeString()}
                            </Typography>
                            <Typography>{task.notes}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </>
    );
};

export default DailyTaskChain;
