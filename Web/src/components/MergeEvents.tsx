import {Box, Button, Dialog} from "@mui/material";
import {useEffect, useState} from "react";
import {getEventsJson} from "../utils.tsx";
import {Task} from "../entity.ts";


export default function MergeEvents() {
    const [open, setOpen] = useState(false);
    const handleButtonClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const [events, setEvents] = useState<Task[]>([]);
    useEffect(() => {
        const storedEventsJson = getEventsJson();
        if (storedEventsJson) {
            const storedEvents = JSON.parse(storedEventsJson); // 只解析一次
            setEvents(storedEvents);
        }
    }, []);

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '1rem' }}
                onClick={handleButtonClickOpen}
            >
                Merge Events
            </Button>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                sx={{
                    '& .MuiDialog-container': {
                        backdropFilter: 'blur(4px)',
                        backgroundColor: 'rgba(255,255,255,0.4)'
                    },
                    '& .MuiPaper-root': {
                        width: '70vw',
                        height: '70vh',
                        maxWidth: 'none',
                        maxHeight: 'none',
                    },
                }}
            >
                {events.map((event) => (
                    <div key={event.id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <h2>{event.title}</h2>
                        <p>Location: {event.location}</p>
                        <p>Start Time: {event.startTime}</p>
                        <p>End Time: {event.endTime}</p>
                        <p>Notes: {event.notes}</p>
                    </div>
                ))}
            </Dialog>
        </Box>
    )
}