const emptyBtn = document.getElementsByClassName("empty-cart-btn")
const removeBtn = document.getElementsByClassName("remove-button")

const emptyCart = async (cid, token) => { 
    fetch(`http://localhost:8080/api/carts/${cid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => response.json())
    .then((json) => {console.log(json); location.reload()})

}

const removeProduct = async (cid, pid, token) => { 
    fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => response.json())
    .then((json) => {console.log(json); location.reload()});
}
emptyBtn[0].addEventListener('click', async() => {
    const attributes = emptyBtn[0].getAttribute('data-cart').split(' ')
    const cartID = attributes[0]
    const token = attributes[1]
    await emptyCart(cartID, token)

})


for (let i = 0; i < removeBtn.length; i++) {
        
    removeBtn[i].addEventListener('click', async () => {
        const attributes = removeBtn[i].getAttribute('data-cart').split(' ')
        const cartID = attributes[0]
        const productID = attributes[1]
        const token = attributes[2]

        await removeProduct(cartID, productID, token)
    })
}




