import mongoose from 'mongoose'
import config from '../config.js'

const URI = config.mongo_URI

await mongoose.connect(URI)
    .then(() => console.log('Connected'))
    .catch(error => console.log(error))
