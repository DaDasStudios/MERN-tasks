import mongoose from 'mongoose'
import { URI, DB_USER, DB_PASSWORD } from './config.js'


// * DB Connection
const connection = () => {
    mongoose.connect(URI, {
        user: DB_USER,
        pass: DB_PASSWORD,
        dbName: "stack-mern"
    })
    .then(() => console.log("DB is connected"))
    .catch(err => console.error(err))
}

export default connection