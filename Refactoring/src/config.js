import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    mongo_URI: process.env.MONGO_URI,
    github_clientID: process.env.CLIENT_ID,
    github_client_secret: process.env.CLIENT_SECRET,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    secretKeyTkn: process.env.KEYTKN,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS
}