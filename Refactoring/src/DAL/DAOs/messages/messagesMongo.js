import { messagesModel } from "../../mongoDB/models/messages.model.js"

export default class MessagesManager {

    async addMessage(info) {
        try {
            const newMessage = await messagesModel.create(info)
            return newMessage
        }
        catch(err) {
            throw err
        }
    }
    
    async getMessages() {
        try {
            const messages = await messagesModel.find()
            return messages
        }
        catch(err) {
            throw err
        }
    }

    async clearMessages() {
        try {
            await messagesModel.deleteMany({})
        } catch (error) {
            throw err
        }
    }

}