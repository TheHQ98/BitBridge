import {v4 as uuidv4} from 'uuid';
import {Event} from "./entity.ts";

const events: Event[] = [];

// create a new event, save into events
export function createEvent(title: string, location: string,
                            startTime: string, endTime: string,
                            notes: string = ''): Event {
    const newEvent: Event = {
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
export function getEventsJson(): string {
    return JSON.stringify(events, null, 2);
}

// get event data from local storage
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