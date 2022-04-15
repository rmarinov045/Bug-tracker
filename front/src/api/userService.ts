import axios from "axios"
import { UserData } from '../types'
import { getAuthToken } from "../auth/auth"
import { auth, storage } from "../firebase"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"

// post user to DB

export async function postUser(user: UserData) {
    const userToken = await getAuthToken()

    try {
        const response = await axios.post(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${userToken}`, JSON.stringify(user))

        if (response.status !== 200) {
            throw new Error(response.data.message)
        }

        return true

    } catch (err) {
        return false
    }
}

// get user from DB

export async function getUser(email: string) {
    const userToken = await getAuthToken()

    try {
        const response = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"&auth=${userToken}`)

        if (response.status !== 200) {
            throw new Error(response.data.message)
        }

        return Object.values(response.data)
    } catch (err) {
        return false
    }
}

// get user DB id 

export async function getUserDBId(email: string) {
    const userToken = await getAuthToken()

    try {
        const response = await axios.get(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"&auth=${userToken}`)

        if (response.status !== 200) {
            throw new Error()
        }

        const id = Object.keys(response.data)[0]

        return id
    } catch (err) {
        return false
    }
}

// update user in DB

export async function updateUser(userData: UserData) {
    const userToken = await getAuthToken()

    try {
        const id = await getUserDBId(userData.email)

        const response = await axios.patch(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${userToken}`, JSON.stringify(userData))

        if (response.status !== 200) {
            throw new Error(response.data.message)
        }

        return response.data

    } catch (err: any) {
        return err.message
    }
}

// update user image in DB 

export async function updateUserImage(URL: string) {
    const userToken = await getAuthToken()
    const userEmail = auth.currentUser?.email

    try {
        const id = await getUserDBId(userEmail || '')

        const response = await axios.patch(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${userToken}&updateMask.fieldPaths=profileImageUrl`, JSON.stringify({ profileImageUrl: URL || '' }))

        if (response.status !== 200) {
            throw new Error(response.data.message)
        }

        return response

    } catch (err: any) {
        return err.message
    }
}

// remove user image in DB

export async function deleteUserImage() {
    const userToken = await getAuthToken()
    const userEmail = auth.currentUser?.email

    try {
        const id = await getUserDBId(userEmail || '')

        const response = await axios.patch(`https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${userToken}&updateMask.fieldPaths=profileImageUrl`, JSON.stringify({ profileImageUrl: '' }))

        if (response.status !== 200) {
            throw new Error(response.data.message)
        }

        return response
    } catch (err: any) {
        return err.message
    }
}

export const uploadImage = async (file: File) => {
    const currentUserId = auth.currentUser?.uid

    const storageRef = ref(storage, 'ProfilePics/' + currentUserId)

    uploadBytes(storageRef, file)

    const downloadUrl = await getDownloadURL(storageRef)

    if (downloadUrl) {
        return downloadUrl
    } else {
        return ''
    }

}

export const downloadImage = async () => {
    const currentUserId = auth.currentUser?.uid

    const storageRef = ref(storage, 'ProfilePics/' + (currentUserId || 'profile.jpeg'))

    try {
        return await getDownloadURL(storageRef) || ''
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const downloadUserImageById = async (id: string) => {
    const storageRef = ref(storage, 'ProfilePics/' + (id || 'profile.jpeg'))

    try {
        return await getDownloadURL(storageRef)
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteImage = async () => {
    const currentUserId = auth.currentUser?.uid

    const storageRef = ref(storage, 'ProfilePics/' + currentUserId)

    try {
        const res = await deleteObject(storageRef)
        return res
    } catch (err: any) {
        return err.message
    }
}

