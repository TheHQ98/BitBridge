import { useState } from 'react';
import { Container } from '@mui/material';
import DateHeader from '../components/DateHeader.tsx';
import DailyTaskChain from '../components/DailyTaskChain.tsx';
import Header from '../components/Header.tsx';

export default function HomeView() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // const [chains, setChains] = useState<Chain>();
    const [containers, setContainers] = useState<string[]>(["114", "514"]) // each item will be uuid to a multitask
    return (
        <Container>
            <Header />
            <DateHeader selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <DailyTaskChain selectedDate={selectedDate} />
        </Container>
    );
}