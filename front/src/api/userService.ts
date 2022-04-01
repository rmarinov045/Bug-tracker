import axios from "axios"
import { User } from "../features/userReducer"
import { userData } from '../Components/Register/register-form'

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

// get user DB id 

export async function getUserDBId(email:string) {
    try {
        const currentUser = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`)
        
        const id = Object.keys(currentUser.data)[0]

        return id
    } catch (err) {
        return false
    }
}

// update user in DB

export async function updateUser(userData :User) {
    try {
        const id = await getUserDBId(userData.email)
         
        const response = await axios.patch(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, JSON.stringify(userData))
    
        return response.data
        
    } catch(err :any) {
        return err.message
    } 
}
