import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

// handles login with email and password and returns user object if successfull
export const login = async function (email: string, password: string): Promise<any> {

    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const user = await response.user
        return user
    } catch(err :any) {
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