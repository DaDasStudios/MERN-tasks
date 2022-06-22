import React, { Component } from "react";

class App extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: 0
        }

        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fetchTasks = this.fetchTasks.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.editTask = this.editTask.bind(this)
    }

    addTask(e) {
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            .then( res => res.json())
            .then( data => {
                M.toast({html: 'Task Updated'})
                this.setState({ ...this.state, title: '', description: '', _id: '' })
                this.fetchTasks()
            })
            })

        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: "Task Saved" })
                    this.setState({ ...this.state, title: '', description: '' })
                    this.fetchTasks()
                })
                .catch(err => console.log(err))
        }
        e.preventDefault()
    }

    componentDidMount() {
        this.fetchTasks()
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data })
            })
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Deleted' })
                    this.fetchTasks()
                })
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state, title: data.title, description: data.description, _id: data._id
                })
            })
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                { /* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required name="title" type="text" placeholder="Task Title" onChange={this.handleChange} value={this.state.title} />
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea required name="description" className="materialize-textarea" placeholder="Task Description" onChange={this.handleChange} value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">{this.state._id ? 'Update Task' : 'Add Task'}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" style={{ margin: '4px' }} onClick={() => this.editTask(task._id)}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App