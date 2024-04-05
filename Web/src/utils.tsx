import {v4 as uuidv4} from 'uuid';

interface Event {
    id: string;
    title: string;
    location: string;
    startTime: string;
    endTime: string;
    notes: string;
    nextEvent: string | null;
}

const events: Event[] = [];

export function generateId(): string {
    return uuidv4();
}

// create a new event, save into events
export function createEvent(title: string, location: string, startTime: string, endTime: string, notes: string = ''): Event {
    const newEvent: Event = {
        id: uuidv4(),
        title: title,
        location: location,
        startTime: startTime,
        endTime: endTime,
        notes: notes,
        nextEvent: null
    };

    events.push(newEvent);
    return newEvent;
}

// get all event
export function getEventsJson(): string {
    return JSON.stringify(events, null, 2);
}

export function initializeEvents(): void {
    const exist = localStorage.getItem("newEventDetails");
    if (exist != null) {
        const storedEvents = JSON.parse(exist);

        if (Array.isArray(storedEvents) && storedEvents.length > 0) {
            events.push(...storedEvents);
        }
        localStorage.removeItem("newEventDetails");
    }

}