const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const http = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//Socket
const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('Connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

http.listen(port,()=>{
    console.log(`Server started at ${port}...`)
})  