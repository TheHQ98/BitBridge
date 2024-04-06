import {v4 as uuidv4} from 'uuid';
import {Task} from "./entity.ts";

const events: Task[] = [];

// create a new event, save into events
export function createEvent(title: string, location: string, startTime: string, endTime: string, notes: string = ''): Task {
    // 先从 localStorage 获取现有的事件数组
    const eventsString = localStorage.getItem("newEventDetails");
    const events = eventsString ? JSON.parse(eventsString) : []; // 如果不存在，创建一个空数组

    // 创建新事件
    const newEvent = {
        id: uuidv4(),
        title,
        location,
        startTime,
        endTime,
        notes,
        nextEvent: null
    };

    const eventExists = events.some((event: Task) => event.title === newEvent.title);
    if (!eventExists) {
        // 添加新事件到事件数组
        events.push(newEvent);
        // 将更新后的事件数组保存到 localStorage
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
    }
}


