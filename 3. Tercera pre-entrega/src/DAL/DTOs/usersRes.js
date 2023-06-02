export default class UsersRes {
    constructor(user) {
        this.username = user.firstName[0] + user.lastName.toUpperCase()
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.age = user.age
        this.email = user.email 
        this.role = user.role
    }
}