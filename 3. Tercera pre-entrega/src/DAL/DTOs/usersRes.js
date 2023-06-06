export default class UsersRes {
    constructor(user) {
        this.username = user.firstName[0] + user.lastName.toUpperCase()
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.age = user.age
        this.email = user.email 
        this.cart = user.cart.toString()
        this.role = user.role
    }
}