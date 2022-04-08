export interface taskData {
    taskName: string,
    taskType: string,
    taskPriority: string,
    taskAuthor: string,
    taskDescription: string
    id: string,
    authorId: string,
    completedBy?: string,
    completedOn?: string,
    project: string | 'default',
}

export interface taskSettings {
    value: string,
    id: number
}

export interface Project {
    name: string,
    id: string
}

export interface UserData {
    firstName: string,
    lastName: string,
    company: string,
    position: string,
    email: string,
    password?: string,
    userId?: string
}

export interface ErrorMessage {
    errorMessage: string
}

export interface Project {
    name: string,
    id: string
}

export interface scatterChartData {
    date: string,
    value: number
}

export interface pieChartData {
    type: string,
    value: number
}

export interface ErrorHandling {
    errorMessage: string,
    errorCode: string
}
