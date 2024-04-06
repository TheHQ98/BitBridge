import {v4 as uuidv4} from 'uuid';
import {Task} from "./entity.ts";

const events: Task[] = [];

// create a new event, save into events
export function createEvent(title: string, location: string, startTime: string, endTime: string, notes: string = ''): Task {
    const newEvent: Task = {
        id: uuidv4(),
        title: title,
        location: location,
        startTime: startTime,
        endTime: endTime,
        notes: notes,
        nextEvent: null
    };
    const eventExists = events.some(event => event.id === newEvent.id);
    if (!eventExists) {
        events.push(newEvent);
        localStorage.setItem("newEventDetails", JSON.stringify(events));
    }
    return newEvent;
}

// get all event
export function getEventsJsonStr(): string {
    return JSON.stringify(events, null, 2);
}

export function getEventsJson(){
    return localStorage.getItem("newEventDetails");
}

export function initializeEvents(): void {
    const exist = localStorage.getItem("newEventDetails");
    if (exist != null) {
        const storedEvents = JSON.parse(exist);

        if (Array.isArray(storedEvents) && storedEvents.length > 0) {
            events.push(...storedEvents);
        }
        // localStorage.removeItem("newEventDetails");
    }
}


