import axios from "axios"
import { User } from "../features/userReducer"
import { userData } from '../Components/Register/register-form'
import { getAuthToken } from "../auth/auth"

// post user to DB

export async function postUser(user :userData) {
    const userToken = await getAuthToken()

    try {
        await axios.post(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${userToken}`, JSON.stringify(user))
    } catch(err) {
        return false
    }
}

// get user from DB

export async function getUser(email :string) {
    const userToken = await getAuthToken()

    try {
        const response = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"&auth=${userToken}`)
        
        return Object.values(response.data)
    } catch(err) {
        return false
    }
}

// get user DB id 

export async function getUserDBId(email:string) {
    const userToken = await getAuthToken()

    try {
        const currentUser = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"&auth=${userToken}`)
        
        const id = Object.keys(currentUser.data)[0]

        return id
    } catch (err) {
        return false
    }
}

// update user in DB

export async function updateUser(userData :User) {
    const userToken = await getAuthToken()

    try {
        const id = await getUserDBId(userData.email)
         
        const response = await axios.patch(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${userToken}`, JSON.stringify(userData))
    
        return response.data
        
    } catch(err :any) {
        return err.message
    } 
}
