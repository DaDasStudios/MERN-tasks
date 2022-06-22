import { Router } from 'express'
import Task from '../models/Task.model.js'

const tasksRouter = Router()

tasksRouter.route('/')
    .get(async (req, res) => {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    })
    .post(async (req, res) => {
        const { title, description } = req.body
        const newTask = new Task({ title, description })
        await newTask.save()
        res.status(201).json({ status: "saved" })
    })

tasksRouter.route('/:id')
    .get(async (req, res) => {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    })
    .put(async (req, res) => {
        const { title, description } = req.body
        const newTask = { title, description }
        await Task.findByIdAndUpdate(req.params.id, newTask)
        res.status(201).send('Edited')
    })
    .delete(async (req, res) => {
        await Task.findByIdAndRemove(req.params.id)
        res.status(200).json({ status: 'Deleted' })
    })

export default tasksRouter