import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareData = async (data, dataDB) => {
    return bcrypt.compare(data, dataDB)
}

export const isLogged = (req, res, next) => {
    return req.cookies.token ? next() : res.redirect('/views/login')
}

export const notLogged = (req, res, next) => {
    return req.cookies.token ? res.redirect('/views/products') : next()
}

export const capitalizeFirst = (str) => {
    str.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
}