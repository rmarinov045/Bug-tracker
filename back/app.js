// import { initializeApp } from 'firebase/app'
// import { getDatabase } from 'firebase/database'
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')
const getAuth = require('firebase/auth').getAuth
const auth = getAuth()

const express = require('express')
const { getDatabase, ref, set, push } = require('firebase/database')
const app = express()
const port = 3001

const firebaseConfig = {
    apiKey: "AIzaSyCJilVpGVk2ux8AmoX-logquB6DnVrntuc",
    authDomain: "bug-tracker-9edf3.firebaseapp.com",
    databaseURL: "https://bug-tracker-9edf3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bug-tracker-9edf3",
    storageBucket: "bug-tracker-9edf3.appspot.com",
    messagingSenderId: "634174039652",
    appId: "1:634174039652:web:8c2ef21ee43bde5cc3e171",
    measurementId: "G-TR9ENNX88Q"
  };

const firebase = require('firebase/app').initializeApp(firebaseConfig)
const database = require('firebase/database')
const { signInWithEmailAndPassword } = require('firebase/auth')
const db = database.getDatabase(firebase)



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

app.use(express.json())

app.listen(port, '0.0.0.0')

let transporter = nodemailer.createTransport(transporter, {     // nodemailer config, need to add email service the future

})



// handles login => currently testing to add data to DB

app.post('/api', (req, res) => {
    const data = JSON.parse(req.body.body)
    res.sendStatus(200)
    const email = data.email
    const password = data.password

    const userListRef = ref(db, 'users')
    const newPostRef = push(userListRef)
    set(newPostRef, {
        email: email,
        password: password
    })
})

app.post('api/confirm', (req, res) => {
    const email = JSON.parse(req.body.body)
    const code = (Math.random() * 10000).split('').slice(0, 6).join('')
    
    res.send(code)


    // generate code
    //get email from request, use nodemailer to send email, send back generated code to react as response
})

// app.post('/login', (req, res) => {
//     const [email, password] = req.body.body
//     console.log(email, password);

// })