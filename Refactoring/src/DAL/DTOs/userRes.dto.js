import { capitalizeFirst } from "../../utils.js"

export default class userRes {
    constructor(user){
        this.firstname = capitalizeFirst(user.firstname)
        this.lastname = capitalizeFirst(user.lastname)
        this.email = user.email
        this.role = user.role
        this.age = user.age
        this.cart = user.cart
        this.username = this.firstname[0] + this.lastname.toUpperCase()
    }
}