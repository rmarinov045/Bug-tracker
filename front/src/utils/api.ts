import axios from "axios"
import { userData } from '../Components/Register/register-form'

export interface taskData {
    taskName: string,
    taskType: string,
    taskPriority: string,
    taskAuthor: string,
    taskDescription: string
    id: string,
    currentUserId?: string
}

const postTaskURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

// post user to DB

export async function postUser(user :userData) {
    try {
        await axios.post('https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json', JSON.stringify(user))
    } catch(err) {
        return false
    }
}

// get user from DB

export async function getUser(email :string) {
    try {
        const response = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`)
        
        return Object.values(response.data)
    } catch(err) {
        return false
    }
}

// post task to DB

export const createTask = async (taskData :taskData) => {
    const data = JSON.stringify(taskData)
    
    try {
        const response = await axios.post(postTaskURL, data)  
        return true
    } catch (err :any) {
        return err.message
    }
}

// gets all tasks from DB 

const getTasksURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

export async function getAllTasks() :Promise<any> {
    const response = await axios.get(getTasksURL).then((res) => res)
    if (response.status !== 200) {
        return null
    }
    return response
}

// delete task

export async function deleteTask(id :string) {
    const currentTask = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?orderBy="id"&equalTo="${id}"`)
    const currentTaskID = Object.keys(currentTask.data)[0]
      
    const response = axios.delete(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentTaskID}.json`)

    if ((await response).status === 200) {
        return {status: 'ok', message: 'Task Deleted'}
    } else {
        return {status: 'failed', message: 'Failed to delete task, please try again later'}
    }
}

// move task to completed in DB 

const completeTaskURL = 'https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/completed.json'

export const completeTask = async (taskData :taskData) => {
    const data = JSON.stringify(taskData)
    
    try {
        const response = await axios.post(completeTaskURL, data)  
        return true
    } catch (err :any) {
        return err.message
    }
}