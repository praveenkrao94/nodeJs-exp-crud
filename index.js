const express = require('express')

require('dotenv').config()

const connectDb = require('./db/connect')

const app = express()

const port = process.env.PORT  // env

const path = require('path')

//  bodyparser middleware//

app.use(express.urlencoded({ extended: true }))  // incomming data

app.use(express.json())  // outgoing


app.use(express.static('./view')) //static


app.use('/', require('./route/userRoute'))
// app.use('/create', require('./route/userRoute'))

// app.all('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './view/404.html'))
// })

app.listen(port, () => {
    connectDb()
    console.log(`listed on http://localhost:${port}`)
})






