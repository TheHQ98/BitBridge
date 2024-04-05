import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    TextField
} from "@mui/material";
import {useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Dayjs} from 'dayjs';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {createEvent, getEventsJsonStr} from "../utils.tsx"


export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [startTimeValue, setStartTimeValue] = useState<Dayjs | null>(null);
    const [endTimeValue, setEndTimeValue] = useState<Dayjs | null>(null);
    const [notes, setNotes] = useState('');


    const handleButtonClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };


    const handleAdd = () => {
        if (title==null || startTimeValue == null || endTimeValue == null) {
            return;
        }

        createEvent(title, location,
            startTimeValue ? startTimeValue.format('YYYY-MM-DD HH:mm:ss') : '',
            endTimeValue ? endTimeValue.format('YYYY-MM-DD HH:mm:ss') : '',
            notes);

        console.log(getEventsJsonStr());
        localStorage.setItem('newEventDetails', getEventsJsonStr());



        handleDialogClose();
        setTitle('');
        setLocation('');
        setStartTimeValue(null);
        setEndTimeValue(null);
    }

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '1rem' }}
                onClick={handleButtonClickOpen}
            >
                Add new event
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
                        width: '50vw',
                        height: '50vh',
                        maxWidth: 'none',
                        maxHeight: 'none',
                    },
                }}
            >
                <DialogTitle id="dialog-title">New Event</DialogTitle>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="location"
                    label="Location or Video Call"
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="Start Time"
                            value={startTimeValue}
                            onChange={(newValue) => setStartTimeValue(newValue)}
                        />
                    </DemoContainer>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="End Time"
                            value={endTimeValue}
                            onChange={(newValue) => setEndTimeValue(newValue)}
                            minDateTime={startTimeValue || undefined}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Notes"
                    id="notes"
                    name="notes"
                    onChange={(e) => setNotes(e.target.value)}
                />
                <DialogActions>
                <Button onClick={handleAdd}>Add</Button>
                <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
);
}