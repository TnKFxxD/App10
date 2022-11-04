const { response } = require('express')
const express = require('express')
const app = express()
const port = 8000
app.use(express.urlencoded({extends: true}))
app.use(express.json())
const session = require('express-session')
app.use(session({secret: 'reactrestapi',
        response: false, saveUninitialized: false}))

app.get('/api/session/get', (request, response) => {
    let s = (request.session.email) ? true : false
    response.json({signedIn: s})
})

app.post('/api/session/set', (request, response) => {
    let email = request.body.email || ''
    let password = request.body.pswd || ''
    if (password === '12345'){
        request.session['emaill'] = email
        response.json({signedIn: true})
    }else{
        response.json({signedIn: false})
    }
})

app.get('/spi/session/del', (request, response) => {
    request.session.destroy(err => {
        response.json({signedIn: false})
    })
})
app.listen(port,() => {
    console.log('Server listening on port:' +port)
})