import supertest from 'supertest'
import { expect } from 'chai'
import config from '../src/config.js'
import { cartManager } from '../src/DAL/DAOs/carts/cartsMongo.js'


const request = supertest('http://localhost:8080')

let adminToken
let userToken 


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

describe('Tests de endpoints de Sessions', () => {

    it('Test metodo POST /api/sessions/login. Login de admin', async () => {
        const response = await request.post('/api/sessions/login').send({email: config.admin_email, password: config.admin_password})
        const tknString = response.headers['set-cookie'][0].split('; ')[0]
        adminToken = tknString.split('=')[1]
        expect(tknString.split('=')[0]).is.equal('Authorization')
    })
    
    it('Test metodo POST /api/sessions/login. Login de User/Premium', async () => {
        const response = await request.post('/api/sessions/login').send({email: 'test@test.com', password: 'test'})
        const tknString = response.headers['set-cookie'][0].split('; ')[0]
        userToken = tknString.split('=')[1]
        expect(tknString.split('=')[0]).is.equal('Authorization')
    })
    
    
})

describe('Tests de endpoints de Products', () => {

    let id

    it('Test metodo POST /api/products. Agregar producto', async () => {
        const response = await request.post('/api/products').send(product1).set({ "Authorization": `Bearer ${adminToken}` })

        expect(response._body.product).to.have.property('_id')
        expect(response._body.product.code).that.is.equal(product1.code)
        id = response._body.product._id.toString()
    })
    
    it('Test metodo GET sin filtros /api/products. Buscar todos los productos', async () => {
        const response = await request.get('/api/products')
       
        expect(response._body).to.have.property('status').that.is.equal('success')
        expect(response._body.payload).to.be.an('array').that.is.not.empty
    })

    it('Test metodo GET con filtros /api/products. Buscar todos los productos con filtros', async () => {
        const response = await request.get('/api/products').query({limit: 5, page: 2})
        
        expect(response._body).to.have.property('status').that.is.equal('success')
        expect(response._body).to.have.property('page').that.is.equal(2)
        expect(response._body.payload).to.be.an('array').that.is.not.empty
        expect(response._body.payload).to.be.an('array').to.have.length(5)
    })

   it('Test metodo GET /api/products/id. Buscar producto por ID', async () => {
        const response = await request.get(`/api/products/${id}`)
       
        expect(response._body).to.have.property('_id').that.is.equal(id)
    })

    it('Test metodo PUT /api/products/id. Modificar producto', async () => {
        const response = await request.put(`/api/products/${id}`).send({title: "Modified", stock: 100, category: "ModifiedCategory"}).set({ "Authorization": `Bearer ${adminToken}` })

        expect(response._body.product).to.have.property('title').that.is.equal('Modified')
        expect(response._body.product).to.have.property('stock').that.is.equal(100)
        expect(response._body.product).to.have.property('category').that.is.equal('ModifiedCategory')
    })

    it('Test metodo DELETE /api/products/id. Borrar producto', async () => {
        await request.delete(`/api/products/${id}`).set({ "Authorization": `Bearer ${adminToken}` })
        const response = await request.get(`/api/products/${id}`)

        expect(response._body).to.be.null
        
    })

})

describe('Tests de endpoints de Carts', () => {

    const cartIdTest = '64db84b04260472c03843a32' //Cart del usuario Test
    const productId1 = '643c8ee6fb29b113057e781c'
    const productId2 = '643c8ef8fb29b113057e7822'
    const productId3 = '643c8f36fb29b113057e7828'
    const productId4 = '643c8f52fb29b113057e782e'
    let cartID


    it('Test metodo POST /api/carts. Crear carrito vacio', async () => {
        const response = await request.post('/api/carts')
        
        expect(response._body).to.have.property('_id')
        expect(response._body).to.have.property('products')
        cartID = response._body._id
    })
    
    it('Test metodo POST /api/carts/cartID/products/productID. Agregar productos al carrito (de a uno)', async () => {
        await request.post(`/api/carts/${cartIdTest}/product/${productId1}`).set({ "Authorization": `Bearer ${userToken}` })
        await request.post(`/api/carts/${cartIdTest}/product/${productId1}`).set({ "Authorization": `Bearer ${userToken}` })
        const response = await request.post(`/api/carts/${cartIdTest}/product/${productId2}`).set({ "Authorization": `Bearer ${userToken}` })
        
        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(2)
        expect(response._body.cart.products[0]).to.have.property('product').to.be.equal(productId1)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(2)
        expect(response._body.cart.products[1]).to.have.property('product').to.be.equal(productId2)
        expect(response._body.cart.products[1]).to.have.property('quantity').to.be.equal(1)
    })
    
    it('Test metodo GET  /api/carts/id. Buscar carrito por ID.', async () => {
        const response = await request.get(`/api/carts/${cartIdTest}`)

        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.an('array').to.be.length(2)
    })

    it('Test metodo PUT /api/carts/id. Agregar productos por array', async () => {
        const response = await request.put(`/api/carts/${cartIdTest}`).send([{product:productId3,
            quantity: 3}, 
         {product:productId4,
            quantity: 5}]).set({ "Authorization": `Bearer ${userToken}` })

        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(4)
        expect(response._body.cart.products[0].product).to.have.property('_id').to.be.equal(productId1)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(2)
        expect(response._body.cart.products[1].product).to.have.property('_id').to.be.equal(productId2)
        expect(response._body.cart.products[1]).to.have.property('quantity').to.be.equal(1)
        expect(response._body.cart.products[2].product).to.have.property('_id').to.be.equal(productId3)
        expect(response._body.cart.products[2]).to.have.property('quantity').to.be.equal(3)
        expect(response._body.cart.products[3].product).to.have.property('_id').to.be.equal(productId4)
        expect(response._body.cart.products[3]).to.have.property('quantity').to.be.equal(5)
    })

    it('Test metodo PUT /api/carts/cartID/products/productID. Modificar cantidad de un producto agregado', async () => {
        const response = await request.put(`/api/carts/${cartIdTest}/products/${productId1}`).send({quantity: 3})

        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(4)
        expect(response._body.cart.products[0]).to.have.property('product').to.be.equal(productId1)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(3)
        
    })

    it('Test metodo DELETE /api/carts/cartID/products/productID. Eliminar un producto del carrito', async () => {
        await request.delete(`/api/carts/${cartIdTest}/products/${productId1}`)
        const response = await request.get(`/api/carts/${cartIdTest}`)

        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(3)
        expect(response._body.cart.products[0].product).to.have.property('_id').to.be.equal(productId2)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(1)
        expect(response._body.cart.products[1].product).to.have.property('_id').to.be.equal(productId3)
        expect(response._body.cart.products[1]).to.have.property('quantity').to.be.equal(3)
        expect(response._body.cart.products[2].product).to.have.property('_id').to.be.equal(productId4)
        expect(response._body.cart.products[2]).to.have.property('quantity').to.be.equal(5)
    })


    it('Test metodo DELETE /api/carts/id. Vaciar carrito', async () => {
        await request.delete(`/api/carts/${cartIdTest}`)
        const response = await request.get(`/api/carts/${cartIdTest}`)

        expect(response._body.cart.products).to.be.an('array').that.is.empty
        await cartManager.deleteOne(cartID)
         
    })
})
