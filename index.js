const express = require('express')  //import l express
const cors = require('cors')

require('./config/db') // chemain ml index ll db
const userController = require("./controllers/userController") // import user controller
const categoryController = require("./controllers/categoryController")

const app = express() //objet ml express
app.use(cors());

const port = 3000 // hedha l port najm nbadlou 
app.use(express.json())
app.use("/user", userController) // temchi direct l user controller 
app.use("/category", categoryController)


app.listen(port, () => { // lansi server 
    console.log("serveur started")
})