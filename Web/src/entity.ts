export interface Event {
    id: string;
    title: string;
    location: string;
    startTime: string;
    endTime: string;
    notes: string;
    nextEvent: string | null;
}