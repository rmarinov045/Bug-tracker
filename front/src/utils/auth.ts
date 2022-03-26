import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

// handles login with email and password and returns user object if successfull
export const login = async function (email: string, password: string): Promise<any> {

    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const user = await response.user
        return user
    } catch (err: any) {
        const [errorCode, errorMessage]: string[] = [err.code, err.message]
        return { errorCode, errorMessage }
    }
}
// handles register with email and password and returns user object if successfull
export const registerUser = async function (email: string, password: string): Promise<any> {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    try {
        const user = await response.user
        return user
    } catch (err: any) {
        const [errorCode, errorMessage]: string[] = [err.code, err.message]
        return { errorCode, errorMessage }
    }
}

// handles updating user in Firebase authentication
export const updateUser = async function (user: any, name: string) {
    try {
        await updateProfile(user, {
            displayName: name
        })
    } catch (err: any) {
        const [errorCode, errorMessage]: string[] = [err.code, err.message]
        return { errorCode, errorMessage }
    }
}

// Generate Firebase ID token => to be done server-side

export const generateAuthToken = async () :Promise<string | undefined | unknown> => {
    try {
        const authToken :string | undefined = await auth.currentUser?.getIdToken(true)
        return authToken
    } catch(error) {
        return error
    }
}

// get user auth token

export const getAuthToken = async () => await auth.currentUser?.getIdToken(true)
