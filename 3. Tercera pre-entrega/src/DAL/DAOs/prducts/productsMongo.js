import mongoose from 'mongoose';
import { productsModel } from '../mongoDB/models/products.model.js';

export default class UsersFile {
    async getAll(){
        try {
            return productsModel.find()
        } catch (err) {
            console.log(err);
        }
    }
    async getOneById(id){

    }

    async createOne(obj){
        try {

        } catch (err) {
            return err
        }
    }

    async deleteOne(id){

    }
}