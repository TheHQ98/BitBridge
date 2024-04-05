import React, { useState } from 'react';
import { IconButton, Button, Stack, Typography, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type DateHeaderProps = {
    // Define additional props if necessary
    startOfWeek?:number;
};

const DateHeader: React.FC<DateHeaderProps> = ({ startOfWeek = 1 }) => {
    const [currentWeek, setCurrentWeek] = useState<Date[]>(generateWeekDays(new Date(), startOfWeek));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    function generateWeekDays(startDate: Date, startOfWeek: number = 1): Date[] {
        const start = new Date(startDate);
        // Adjust to start of the week based on the provided startOfWeek
        const day = start.getDay();
        const difference = start.getDate() - day + (day < startOfWeek ? -7 : 0) + startOfWeek;
        start.setDate(difference);

        return Array.from({ length: 7 }, (_, index) =>
            new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
    }


    const handleWeekChange = (direction: 'previous' | 'next') => {
        setCurrentWeek(prevWeek => {
            const startDay = new Date(prevWeek[0]);
            direction === 'previous' ? startDay.setDate(startDay.getDate() - 7) : startDay.setDate(startDay.getDate() + 7);
            return generateWeekDays(startDay, startOfWeek);
        });
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h6" align="center">
                {currentWeek[0].toLocaleString('default', { month: 'long' })} {currentWeek[0].getFullYear()}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
                <IconButton onClick={() => handleWeekChange('previous')}>
                    <NavigateBeforeIcon />
                </IconButton>
                {currentWeek.map((date, index) => (
                    <Grid item xs key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant={selectedDate && date.getTime() === selectedDate.getTime() ? "contained" : "outlined"}
                            style={{
                                minWidth: 60, // Adjusted for more content
                                height: 60, // Adjusted for more content
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0, // Remove padding to fit content
                                backgroundColor: selectedDate && date.getTime() === selectedDate.getTime() ? '#1976d2' : undefined,
                                color: selectedDate && date.getTime() === selectedDate.getTime() ? '#fff' : undefined,
                            }}
                            onClick={() => handleDateSelect(date)}
                        >
                            <Typography variant="caption" component="div">
                                {date.toLocaleDateString('default', { weekday: 'short' })}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {date.getDate()}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
                <IconButton onClick={() => handleWeekChange('next')}>
                    <NavigateNextIcon />
                </IconButton>
            </Grid>
        </Stack>
    );
};

export default DateHeader;
