import React from 'react';
import { IconButton, Button, Stack, Typography, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Timetable from "./Timetable.tsx";

type DateHeaderProps = {
    startOfWeek?: number;
    selectedDate: Date;
    onDateSelect: (newDate: Date) => void;
};

const DateHeader: React.FC<DateHeaderProps> = ({ startOfWeek = 1, selectedDate, onDateSelect }) => {
    const [currentWeek, setCurrentWeek] = React.useState<Date[]>(generateWeekDays(selectedDate, startOfWeek));

    function generateWeekDays(startDate: Date, startOfWeek: number): Date[] {
        const start = new Date(startDate);
        const day = start.getDay();
        const difference = start.getDate() - day + (day < startOfWeek ? -6 : 1);
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

    React.useEffect(() => {
        setCurrentWeek(generateWeekDays(selectedDate, startOfWeek)); // Regenerate week days when selectedDate changes
    }, [selectedDate, startOfWeek]);

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
                            variant={selectedDate.toDateString() === date.toDateString() ? "contained" : "outlined"}
                            style={{
                                minWidth: 60,
                                height: 60,
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0,
                                backgroundColor: selectedDate.toDateString() === date.toDateString() ? '#1976d2' : undefined,
                                color: selectedDate.toDateString() === date.toDateString() ? '#fff' : undefined,
                            }}
                            onClick={() => onDateSelect(date)}
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
            <Timetable /> {/* 将 Timetable 放在 DateHeader 下方 */}
        </Stack>
    );
};

export default DateHeader;

