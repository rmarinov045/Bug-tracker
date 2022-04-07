import axios from "axios"
import { getAuthToken } from "../auth/auth"

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

const postTaskURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

// post task to DB

export const createTask = async (taskData :taskData) => {
    const userToken = await getAuthToken()
    const data = JSON.stringify(taskData)
    
    try {
        const response = await axios.post(postTaskURL + `?auth=${userToken}`, data)  

        if (response.status !== 200) {
            throw new Error()
        }

        return true
    } catch (err :any) {
        return err.message
    }
}

// gets all tasks from DB 

const getTasksURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

export async function getAllTasks(projectId :string) :Promise<any> {
    const userToken = await getAuthToken()
    const response = await axios.get(getTasksURL + `?auth=${userToken}&orderBy="project"&equalTo="${projectId}"`)
    
    if (response.status !== 200) {
        return null
    }
    return Object.values(response.data)
}

// delete task

export async function deleteTask(id :string) {
    const userToken = await getAuthToken()
    const currentTask = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?orderBy="id"&equalTo="${id}"&auth=${userToken}"`)
    const currentTaskID = Object.keys(currentTask.data)[0]
    
    const response = axios.delete(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentTaskID}.json?auth=${userToken}`)

    if ((await response).status === 200) {
        return {status: 'ok', message: 'Task Deleted'}
    } else {
        return {status: 'failed', message: 'Failed to delete task, please try again later'}
    }
}

// move task to completed in DB 

const completeTaskURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/completed.json'

export const completeTask = async (taskData :taskData) => {
    const userToken = await getAuthToken()
    const data = JSON.stringify(taskData)
    
    try {
        const response = await axios.post(completeTaskURL + `?auth=${userToken}`, data)  

        if (response.status !== 200) {
            throw new Error()
        }

        return true
    } catch (err :any) {
        return err.message
    }
}

// get completed tasks from DB 

export const getAllCompletedTasksByIdAndProject = async (userId :string, projectId: string) => {
    const userToken = await getAuthToken()

    const response = await axios.get(completeTaskURL + `?orderBy="completedBy"&equalTo="${userId}"&auth=${userToken}&orderBy="project"&equalTo="${projectId || 'default'}"`)

    if (response.status !== 200) {
        throw new Error('Could not fetch tasks.')
    }

    return Object.values(response.data)
}

// edit task in DB

export const editTask = async (task :any) => {

    const userToken = await getAuthToken()

    try {
        const taskDBId = await getTaskById(task.id)
        const response = await axios.put(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskDBId}.json?auth=${userToken}`, task)

        if (response.status !== 200) {
            throw new Error('Could not edit task')
        }

        return response.data

    } catch(err :any) {
        return { status: 'Failed', message: err.message }
    }


}

// get task by ID from DB 

export const getTaskById = async (id :string) => {

    const userToken = await getAuthToken()

    try {
        const response = await axios.get(postTaskURL + `?orderBy="id"&equalTo="${id}"&auth=${userToken}`)

        if (response.status !== 200) {
            throw new Error('Could not find task')
        }

        return Object.keys(response.data)[0]

    } catch(err :any) {
        return err.message
    }


}