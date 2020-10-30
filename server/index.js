const express = require("express")
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { db } = require('./db')
const api = require('./api')
const path = require('path')
const authMiddleware = require ('./middleware/authentication')

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(authMiddleware)

app.use((req, res, next) => {
    console.log('cookies', req.cookies);
    if (req.cookies.sid) {
      //req.user = DATABASE.SESSIONS[req.cookies.session_id];
      //console.log('Hello world');
    }
    next();
});

app.use(express.static(path.join(__dirname, '/public')))
app.use('/api', api)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use(function(req, res, next){
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next){
    console.error(err,err.stack)
    res.status(err.status || 500)
    res.send('something wrong: ' + err.message)
})

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

init()
