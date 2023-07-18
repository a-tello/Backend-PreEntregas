import mongoose from 'mongoose'
import config from '../../config.js'

try {
    await mongoose.connect(config.mongo_URI)
    console.log('Connected')
} catch (err) {
    throw err
}
