import express from "express"

const PORT = 8080
const app = express()


app.get('/', () => console.log('a'))    

app.listen(PORT,() => console.log(`Listen on port ${PORT}`))
    