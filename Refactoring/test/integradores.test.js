import supertest from 'supertest'
import { expect } from 'chai'

const request = supertest('http://localhost:8080')

const product1 = {
    title: "TestProduct1",
    description: "TestDescription1",
    price: 1,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_625065-MLA43751822948_102020-O.jpg ",
    code: "a1",
    stock: 50,
    category: "Test1",
    status: true,
    owner:""
}

const product2 = {
    title: "TestProduct2",
    description: "TestDescription2",
    price: 2,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_625065-MLA43751822948_102020-O.jpg ",
    code: "a2",
    stock: 50,
    category: "Test2",
    status: true,
    owner:""
}

describe('Tests de endpoints de Products', () => {
    /* it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1)
        expect(response._body).to.have.property('_id')
    }) */
    
    it('Test metodo GET sin filtros /api/products', async () => {
        const response = await request.get('/api/products')
        expect(response._body).to.have.property('status').that.is.equal('success')
        expect(response._body.payload).to.be.an('array').that.is.not.empty
    })

    it('Test metodo GET /api/products/id', async () => {
        //const createProduct = await request.post('/api/products').send(product2)
        //console.log(createProduct);
        //const id = createProduct._body._id
        const response = await request.get(`/api/products/64b17b9f786c6e16c20837bb`)
        console.log(response);
        expect(response._body).to.be.equal({...product2, _id: '64b17b9f786c6e16c20837bb', __v: 0})
    })
    /*it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1)
        expect(response.body).to.have.property('_id')
    })
    it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1)
        expect(response.body).to.have.property('_id')
    })
    it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1)
        expect(response.body).to.have.property('_id')
    })
    it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1)
        expect(response.body).to.have.property('_id')
    }) */

})  
