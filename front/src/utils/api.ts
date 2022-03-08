import axios from "axios"
import { userData } from '../Components/register-form'

export interface taskData {
    taskName: string,
    taskType: string,
    taskPriority: string,
    taskAuthor: string,
    id: string
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

// generates IDs for DB
export function generateTaskId() {
    return (Date.now()).toString() // placeholder ID generation
}