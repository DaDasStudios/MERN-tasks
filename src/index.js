import app from './app.js'

// ? Starting server
app.listen(app.get('port'))
    console.log(`Server on port ${app.get('port')}`)

