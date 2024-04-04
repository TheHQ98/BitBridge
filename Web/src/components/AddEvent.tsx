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


export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [startTimeValue, setStartTimeValue] = useState<Dayjs | null>(null);
    const [endTimeValue, setEndTimeValue] = useState<Dayjs | null>(null);
    const [notes, setNotes] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (title==null || startTimeValue == null || endTimeValue == null) {
            return;
        }
        console.log('Title:', title);
        console.log('Location:', location);
        console.log('Start Time:', startTimeValue.format('YYYY-MM-DD HH:mm:ss'));
        console.log('End Time:', endTimeValue.format('YYYY-MM-DD HH:mm:ss'));
        console.log("Notes:", notes);
        handleClose();
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
                onClick={handleClickOpen}
            >
                Add new event
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            label="Start Time"
                            value={startTimeValue}
                            onChange={(newValue) => setStartTimeValue(newValue)}
                        />
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
                <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
);
}