import express from "express";
import { join } from 'path'
import morgan from 'morgan'
import tasksRouter from './routes/tasks.routes.js'
import { __dirname, PORT } from "./config.js";
import connection from './database.js'

// * Initializate server and database
const app = express()
connection()

// * Settings
app.set('port', PORT || 5000)


// * Middlewares
app.use(morgan('dev'))
app.use(express.json())

// * Routes
app.use('/api/tasks', tasksRouter)

// * Static files
app.use(express.static(join(__dirname, 'public')))

export default app