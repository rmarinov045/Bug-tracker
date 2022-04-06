import axios from "axios";
import { getAuthToken } from "../auth/auth";
import { generateTaskId } from "../utils/util";

const projectDBUrl = `https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/projects.json`

const singleProjectDbUrl = (id :string) => `https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/projects/${id}.json`

export const getCurrentProjectDbId = async (id: string) => {
    try {
        const response = await axios.get(projectDBUrl + `?auth=${await getAuthToken()}&orderBy="id"&equalTo="${id}"`)
        return Object.keys(response.data)[0] as string
    } catch (err :any) {
        return null
    }
}

export const createProjectInDb = async (name :string) => {
    const id = generateTaskId()

    try {
        await axios.post(projectDBUrl + `?auth=${await getAuthToken()}`, JSON.stringify( { name, id } ))
        
        return { name, id }
    } catch (err :any) {
        return err.message
    }
}

export const getProjectsFromDb = async () => {
    try {
        const response = await axios.get(projectDBUrl + `?auth=${await getAuthToken()}`)
        
        return response.data
    } catch (err :any) {
        return err.message
    }
}

export const deleteProject = async (id :string) => {
    const currentProjectDbId = await getCurrentProjectDbId(id)

    if (currentProjectDbId) {
        try {
            const response = await axios.delete(`${singleProjectDbUrl(currentProjectDbId)}?auth=${await getAuthToken()}&`)
            
            return response
        } catch (err :any) {
            return err.message
        }
    }
}