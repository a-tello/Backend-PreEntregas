import ProductsManager from '../DAL/DAOs/products/productsMongo.js'

const productManager = new ProductsManager()

export const getAll = async (query, params) => {
    try {
        const products = await productManager.getAll(query, params)
        return {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: `localhost:8080/products/`,
            nextLink: `localhost:8080/products/`
        }
    } catch (err) {
        return {
            status: 'error',
            msg: err
        }
    }
}

export const getOneById = async (id) => {
    try {
        return await productManager.getOneById(id)
    } catch (err) {
        throw err
    }
}

export const createOne = async (product) => {
    try {
        return await productManager.createOne(product)
    } catch (err) {
        throw err
    }
}

export const updateOne = async (id, data) => {
    try {
        return await productManager.updateOne(id, data, {new:true})
    } catch (err) {
        throw err
    }
}

export const deleteOne = async (id) => {
    try {
        return await productManager.deleteOne(id)
    } catch (err) {
        throw err
    }
}