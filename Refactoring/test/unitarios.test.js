import { expect } from 'chai'
import '../src/DAL/mongoDB/dbConfig.js'
import { cartManager } from '../src/DAL/DAOs/carts/cartsMongo.js'
import { productManager } from '../src/DAL/DAOs/products/productsMongo.js'

describe('Test de DAO de carts', () => {

    let cartID
    const product1 = '643c8ee6fb29b113057e781c'
    const product2 = '643c8eecfb29b113057e781e'
    const product3 = {
        product: '643c8f52fb29b113057e782e',
        quantity: 5
    }
    const product4 = {
        product: '643c8f42fb29b113057e782c',
        quantity: 10
    }

    it('Se crea y se retorna un cart vacío', async () =>{
        const cart = await cartManager.createOne()
        cartID = cart._id

        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').that.is.empty
    })

    it('Se busca un carrito por ID', async () =>{
        const cart = await cartManager.getCartById(cartID)

        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').that.is.empty
    })
    
    it('Se agregan productos distintos al carrito vacío', async () =>{
        await cartManager.updateCart(cartID, {$push:{"products":{product: product1, quantity:1}}}, {new:true})
        await cartManager.updateCart(cartID, {$push:{"products":{product: product2, quantity:1}}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(2)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product1)
        expect(cart.products[0].quantity).that.is.equal(1)
        expect(cart.products[1].product._id.toString()).that.is.equal(product2)
        expect(cart.products[1].quantity).that.is.equal(1)
    })
    
    it('Se elimina un producto del carrito', async () =>{
        await cartManager.updateCart(cartID, {"$pull":{"products":{"product":product2}}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(1)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product1)
        expect(cart.products[0].quantity).that.is.equal(1)

    })
    
    it('Se agregan productos iguales al carrito vacío', async () =>{
        await cartManager.updateCart({_id:cartID, "products.product":product1},{$inc:{"products.$.quantity":1}}, {new:true})
        await cartManager.updateCart({_id:cartID, "products.product":product1},{$inc:{"products.$.quantity":1}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(1)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product1)
        expect(cart.products[0].quantity).that.is.equal(3)
        
    })

    it('Se vacía el carrito', async () =>{
        await cartManager.updateCart(cartID, {"$pull":{"products":{}}}, {new:true})
        const cart = await cartManager.getCartById(cartID)

        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').that.is.empty
    })

    it('Se agregan varios productos iguales al carrito vacío', async () =>{
        await cartManager.updateCart({_id:cartID}, {$push:{"products":{$each :[product3]}}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(1)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product3.product)
        expect(cart.products[0].quantity).that.is.equal(5)
        
    })

    it('Se agregan varios productos diferentes al carrito vacío', async () =>{
        await cartManager.updateCart(cartID, {"$pull":{"products":{}}}, {new:true})
        await cartManager.updateCart({_id:cartID}, {$push:{"products":{$each :[product3, product4]}}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(2)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product3.product)
        expect(cart.products[0].quantity).that.is.equal(5)
        expect(cart.products[1].product._id.toString()).that.is.equal(product4.product)
        expect(cart.products[1].quantity).that.is.equal(10)
    })

    it('Se agregan varios productos diferentes al carrito con productos', async () =>{
        await cartManager.updateCart({_id:cartID, "products.product":product3.product}, {$inc:{"products.$.quantity":product3.quantity}}, {new:true})
        await cartManager.updateCart({_id:cartID, "products.product":product4.product}, {$inc:{"products.$.quantity":product4.quantity}}, {new:true})
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(2)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product3.product)
        expect(cart.products[0].quantity).that.is.equal(10)
        expect(cart.products[1].product._id.toString()).that.is.equal(product4.product)
        expect(cart.products[1].quantity).that.is.equal(20)
    })

    it('Se modifica la cantidad de un producto dentro de un carrito', async () =>{
        await cartManager.updateCart({_id:cartID, "products.product": product3.product}, {$set:{"products.$.quantity":25}}, {new:true})
        const cart = await cartManager.getCartById(cartID)

        expect(cart).to.have.property('_id')
        expect(cart).to.have.property('products').to.be.an('array').to.have.length(2)
        expect(cart.products[0]).to.have.keys(['product', 'quantity'])
        expect(cart.products[0].product._id.toString()).that.is.equal(product3.product)
        expect(cart.products[0].quantity).that.is.equal(25)
        expect(cart.products[1].product._id.toString()).that.is.equal(product4.product)
        expect(cart.products[1].quantity).that.is.equal(20)
    })

    it('Se elimina un carrito', async () =>{
        await cartManager.deleteOne(cartID)
        const cart = await cartManager.getCartById(cartID)
        
        expect(cart).is.equal(null)
    })
    
})

describe('Test DAO products', () => {

    let productID
    const product1 = {
        title: "Test2",
        description: "Test",
        price: 844,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_625065-MLA43751822948_102020-O.jpg ",
        code: "133asaaasds",
        stock: 50,
        category: "higiene",
        status: true,
        owner:""
    }

    it('Se busca un producto inexistente', async () => {
        const product = await productManager.getOneById('643c8ee6fb29b113057e123d')

        expect(product).that.is.equal(null)
    })

    it('Se agrega un producto', async () => {
        const product = await productManager.createOne(product1)
        productID = product._id.toString()

        expect(product).to.have.property('_id')
        expect(product).to.have.property('status').that.is.equal(true)
        expect(product).to.have.property('code').that.is.equal(product1.code)
    })

    it('Se busca un producto existente', async () => {
        const product = await productManager.getOneById(productID)

        expect(product._id.toString()).that.is.equal(productID)
        expect(product).to.have.property('status').that.is.equal(true)
        expect(product).to.have.property('code').that.is.equal(product1.code)
    })

    it('Se buscan todos los productos', async () => {
        const products = await productManager.getAll()
        
        expect(products).to.have.property('docs').to.be.an('array').that.is.not.empty
    })

    it('Se modifica un producto', async () => {
        await productManager.updateOne(productID, {title: 'Modified', stock: 1000,category: "cat.modified"})
        const product = await productManager.getOneById(productID)
        
        expect(product._id.toString()).that.is.equal(productID)
        expect(product).to.have.property('title').that.is.equal('Modified')
        expect(product).to.have.property('stock').that.is.equal(1000)
        expect(product).to.have.property('category').that.is.equal('cat.modified')
        expect(product).to.have.property('code').that.is.equal(product1.code)
    })


    it('Se elimina un producto', async () => {
        await productManager.deleteOne(productID)
        const product = await productManager.getOneById(productID)

        expect(product).that.is.equal(null)
    })
})