import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app :FirebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = getAuth(app)
export default app

// Initial firebase confing and exposing firebase and auth module to react app

// To do: Make sure firebase database usage is set up

// To do: Set up firebase rules and give token to user + define actions he is allowed to do in DB