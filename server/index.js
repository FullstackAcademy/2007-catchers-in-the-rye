const express = require("express")
const app = express()
const morgan = require('morgan')
const { db, Example, Example2 } = require('./db')
const api = require('./api')
const path = require('path')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded( {extended: false} ))

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use(express.static(path.join(__dirname, '/public')))

//require in your routes and use them on your api path
app.use('/api', api)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
  })

//404 handler
app.use(function(req, res, next){
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

//500 handler
app.use(function(err, req, res, next){
    console.error(err,err.stack)
    res.status(err.status || 500)
    res.send('something wrong: ' + err.message)
})

//set PORT
async function init(){
    try{
        console.log('syncing')
        await db.sync()
        const PORT = process.env.PORT || 3000
        await app.listen(PORT, function(){
            console.log(`Listening at http://localhost:${PORT}`)
        })
    } catch(error) {
        console.error(error)
    }
}

//listen
init()
