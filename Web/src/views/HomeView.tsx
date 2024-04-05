import React, { useState } from 'react';
import { Container } from '@mui/material';
import DateHeader from '../components/DateHeader.tsx';
import DailyTaskChain from '../components/DailyTaskChain.tsx';
import Header from '../components/Header.tsx';

export default function HomeView() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Container>
            <Header />
            <DateHeader selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <DailyTaskChain selectedDate={selectedDate} />
        </Container>
    );
}