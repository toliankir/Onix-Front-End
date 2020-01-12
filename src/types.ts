export interface Task {
    id: string,
    title: string,
    description: string,
    date: string,
    status: TaskStatus,
}

export interface Comment {
    data: string,
    comments: Array<string>,
    images: Array<string>,
    date: string,
    icon: {
        type: string,
        color: string,
    },
}

export interface UserProfile {
    name: string,
    group: string,
    image: string,
}

export interface UserIcon {
    name: string,
    image: string,
}

export enum TaskStatus {
    todo = 'Todo',
    inprogress = 'Inprogress',
    done = 'Done',
}
