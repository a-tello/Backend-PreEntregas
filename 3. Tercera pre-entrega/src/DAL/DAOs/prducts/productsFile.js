import fs from 'fs'

export default class UsersFile {
    async getAll(){
        try {
            if(fs.existsSync(path)) {
                const data = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getOneById(id){

    }

    async createOne(obj){
        try {
            const data = await this.getAll()
            let id
            if (!data.length) {
                id = 1
            } else {
                id = data[data.length - 1].id +1
            }

            const newObj = {...obj, id}
            data.push(newObj)
            await fs.promises.writeFile(path, JSON.stringify())
            return newObj

        } catch (err) {
            return err
        }
    }

    async deleteOne(id){

    }
}