import dotenv from 'dotenv'
import { __dirname } from './utils.js';

dotenv.config({path: __dirname +'/.env'})

export default {
    port: process.env.PORT,
    mongo_URI: process.env.MONGO_URI,
    github_clientID: process.env.CLIENT_ID,
    github_client_secret: process.env.CLIENT_SECRET,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    secretKeyTkn: process.env.KEYTKN
}