import express from "express"
import config from "./config.js"
import './DAL/mongoDB/dbConfig.js'

const PORT = config.port
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
     
app.get('/', () => console.log('a'))    

app.listen(PORT,() => console.log(`Listen on port ${PORT}`))
    