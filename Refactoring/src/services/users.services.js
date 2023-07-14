import UsersManager from "../DAL/DAOs/users/usersMongo.js"
import config from "../config.js"

const userManager = new UsersManager()
export const adminUser = {
    firstname: 'Admin',
    lastname: 'Coder',
    role: 'Admin',
    email: config.admin_email,
}


export const getAllUsers = async (filter={}) => {
     try {
        return await userManager.getAllUsers(filter)
    } catch (err) {
        throw err
    }
}

export const getOneUserBy = async (filter) => {
    try {
        return await userManager.find(filter)
    } catch (err) {
        throw err
    }
}

export const createUser = async (obj) => {
    try {
        return await userManager.createUser(obj)
    } catch (err) {
        throw err
    }
}

export const isAdmin = async (email, password) => {
    return email === config.admin_email && password === config.admin_password   
}