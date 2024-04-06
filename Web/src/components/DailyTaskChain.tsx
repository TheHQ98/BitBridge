// import React, { useEffect, useState } from 'react';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
// import {Box, Button, Stack, Step, StepLabel, Stepper, Typography} from '@mui/material';
// import {Task} from "../entity.ts";
// import {getEventsJson} from "../utils.tsx";
//
// type DailyTaskChainProps = {
//     selectedDate: Date;
// };
//
//
//
// const DailyTaskChain: React.FC<DailyTaskChainProps> = ({ selectedDate }) => {
//     const [tasks, setTasks] = useState<Task[]>([]);
//
//     useEffect(() => {
//         const storedEventsJson = getEventsJson();
//         // console.log(storedEventsJson);
//         if (storedEventsJson) {
//             const storedEvents = JSON.parse(storedEventsJson);
//             console.log(storedEvents[0].startTime)
//             // Filter tasks for the selected day and sort them
//             const dailyTasks = storedEvents.filter((task: { startTime: string | number | Date; }) => {
//                 const taskDate = new Date(task.startTime).toDateString();
//                 return taskDate === selectedDate.toDateString();
//             }).sort((a: { startTime: string | number | Date; }, b: { startTime: string | number | Date; }) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
//
//             setTasks(dailyTasks);
//         }
//         // console.log(tasks);
//     }, [selectedDate]);
//     // if (tasks.length === 0) return null; // Don't render anything if there are no tasks
//
//
//
//     return (
//         <Stack spacing={2} alignItems="center" style={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
//             {/*<Typography variant="h6" align="center">*/}
//             {/*    Tasks for {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}*/}
//             {/*</Typography>*/}
//             <Stack spacing={1} alignItems="flex-start">
//                 {tasks.map((task, index) => (
//                     <React.Fragment key={task.id}>
//                         {index > 0 && <Box style={{ width: '100%', height: '2px', backgroundColor: '#bdbdbd' }} />}
//                         <Stack direction="row" spacing={1} alignItems="center">
//                             <Button
//                                 variant={selectedDate.toDateString() === new Date(task.startTime).toDateString() ? "contained" : "outlined"}
//                                 style={{
//                                     minWidth: 40,
//                                     width: 40,
//                                     height: 40,
//                                     borderRadius: '50%',
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     padding: 0,
//                                 }}
//                                 onClick={() => onDateSelect(new Date(task.startTime))}
//                             >
//                                 {/* Empty content for the circle */}
//                             </Button>
//                             <Typography variant="caption" sx={{ flexGrow: 1 }}>
//                                 {task.title}
//                             </Typography>
//                         </Stack>
//                     </React.Fragment>
//                 ))}
//             </Stack>
//         </Stack>
//
//     // <>
//         //     <Timeline position="alternate">
//         //         {tasks.map((task, index) => (
//         //             <TimelineItem key={index}>
//         //                 <TimelineSeparator>
//         //                     <TimelineDot />
//         //                     {index < tasks.length - 1 && <TimelineConnector />} {/* Only render connector if not the last item */}
//         //                 </TimelineSeparator>
//         //                 <TimelineContent>
//         //                     <Typography variant="h6" component="span">
//         //                         {task.title}
//         //                     </Typography>
//         //                     <Typography>{task.location}</Typography>
//         //                     <Typography color="text.secondary">
//         //                         {new Date(task.startTime).toLocaleTimeString()} - {new Date(task.endTime).toLocaleTimeString()}
//         //                     </Typography>
//         //                     <Typography>{task.notes}</Typography>
//         //                 </TimelineContent>
//         //             </TimelineItem>
//         //         ))}
//         //     </Timeline>
//         // </>
//     );
// };
//
// export default DailyTaskChain;

import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Task } from "../entity.ts";
import { getEventsJson } from "../utils.tsx";

type DailyTaskChainProps = {
    selectedDate: Date;
};

const DailyTaskChain: React.FC<DailyTaskChainProps> = ({ selectedDate }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    useEffect(() => {
        const storedEventsJson = getEventsJson();
        if (storedEventsJson) {
            const storedEvents = JSON.parse(storedEventsJson);
            // Filter and sort tasks as before
            const dailyTasks = storedEvents.filter((task: Task) => {
                const taskDate = new Date(task.startTime).toDateString();
                return taskDate === selectedDate.toDateString();
            }).sort((a: Task, b: Task) =>
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            );

            setTasks(dailyTasks);
        }
    }, [selectedDate]);

    const handleSelectTask = (task: Task) => {
        setSelectedTaskId(task.id); // Set the selected task id
    };

    return (
        <Stack spacing={2} alignItems="center" style={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
            <Typography variant="h6" align="center">
                Tasks for {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>
            <Stack spacing={4} alignItems="flex-start">
                {tasks.map((task, index) => (
                    <React.Fragment key={task.id}>
                        {index > 0 && <Box style={{ borderColor: '#bdbdbd', marginLeft:'5px', paddingLeft:'5px', borderWidth:'2px'}} />}
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button
                                variant={selectedTaskId === task.id ? "contained" : "outlined"}
                                style={{
                                    minWidth: 40,
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 0,
                                }}
                                onClick={() => handleSelectTask(task)}
                            >
                                {/* Empty content for the circle */}
                            </Button>
                            <Stack spacing={0.5}>
                                <Typography variant="caption">
                                    {task.title}
                                </Typography>
                                {selectedTaskId === task.id &&
                                    <>
                                    <Typography variant="body2">
                                        {task.location}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {task.notes}
                                    </Typography>
                                    </>
                                }
                            </Stack>
                        </Stack>
                    </React.Fragment>
                ))}
            </Stack>
        </Stack>
    );
};

export default DailyTaskChain;

