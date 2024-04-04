import {Box,Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import {useState} from "react";

export default function AddEvent() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        backdropFilter: 'blur(4px)', // 设置背景模糊
                        backgroundColor: 'rgba(255,255,255,0.4)' // 可以调整背景色和透明度
                    },
                    '& .MuiPaper-root': {
                        maxWidth: '80%', // 调整对话框宽度，可以是固定值或百分比
                        maxHeight: '80vh', // 调整对话框高度
                    },
                }}
            >
                <DialogTitle id="dialog-title">New Event</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        Add a new event
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}