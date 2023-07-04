const btn = document.getElementsByClassName("product-cart-button")

const addProductToCart = async (cid, pid) => { 
    
    fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
        method: "POST",
    })
    .then((response) => response.json())
    .then((json) => console.log(json)); 
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', async () => {
        const attributes = btn[i].getAttribute('data-product').split(' ')
        const product = attributes[0]
        const cart = attributes[1]
        await addProductToCart(cart, product)
    })
  }

