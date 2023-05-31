import mongoose from 'mongoose'
import config from '../../config.js'

mongoose.connect(config.mongo_uri)
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))