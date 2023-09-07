/* eslint-disable no-use-before-define */
import { parseRequestUrl, rerender } from "../utils";
import { getProduct } from '../api'; 
import { getCartItems, getUserInfo, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false)=>{
    let cartItems = getCartItems();
    const existingItem = cartItems.find(x => x.product === item.product);
    
    if(existingItem){
        if(forceUpdate){ 
            cartItems = cartItems.map((x) => 
            x.product === existingItem.product? item : x);
        }
    } else {
        
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems)
    if(forceUpdate){
        rerender(CartScreen);
    }
    
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.product !== id));
    if(id === parseRequestUrl().id) {
        document.location.hash ='/cart';     
    } else {
        rerender(CartScreen);
    }
}

const CartScreen = {
    after_render: () =>{
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach( qtySelects => {
            qtySelects.addEventListener("change", e=>{
                const item = getCartItems().find(x => x.product === qtySelects.id);
                addToCart({...item, qty: Number(e.target.value)}, true);
        });
    });
    const deleteButtons = document.getElementsByClassName("delete-button");
    Array.from(deleteButtons).forEach(deleteButton =>{
        deleteButton.addEventListener('click', () =>{
            removeFromCart(deleteButton.id);
        });
    })
    document.getElementById('checkout-button').addEventListener('click', () => {
        window.location.href = window.location.origin + window.location.pathname + "#/login";
    });
    
},
    render: async () =>{
        const userInfo = getUserInfo();

        // Vérifiez si l'utilisateur est connecté.
        if (!userInfo) {
            document.location.hash = '/login';
            return `<div>Please login to view your cart.</div>`; // Message de redirection (optionnel)
        }

        const req = parseRequestUrl();
        const cartItems = getCartItems();
        if(req.id){
            const product = await getProduct(req.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price:product.price,
                countInStock: product.countInStock,
                qty: 1,
            })
        }
        
        return `
        <div class="cart">
            <div class="cart-list">
            <h3>Shopping Cart</h3>
                 <ul class="cart-list-container">
                    ${cartItems.length === 0?
                    `<div>vitre panier ait vide <a href="/#/">alli shouppinger</a></div>`:
                    cartItems.map(item => `
                    <li>
                        <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" />
                         </div>
                         <div class="cart-name">
                            <div>
                            <a href="/#/product/${item.product}">
                            ${item.name}
                            </a>
                            </div>
                            <div>
                                Qty: <select class="qty-select" id="${item.product}">
                                        ${
                                            [...Array(item.countInStock).keys()].map(x => item.qty === x+1 
                                                ?`<option selected value = "${x+1}">${x+1}</option>`
                                            :`<option value = "${x+1}">${x+1}</option>`
                                            )
                                        }
                                    </select>
                                    <button type='button' class='delete-button' id="${item.product}">
                                        DELETE
                                    </button>
                            </div>
                        </div>   
                        
                        <div class="cart-price">${item.price}€</div>
                    </li>
                    `).join('\n')
                }
            </ul>
            </div>
            <div class="cart-action">
                <!-- 0 est la valeur de démarrage de l'accumulateur -->
                <h3> Subtotal (${cartItems.reduce((accum,current) => accum + current.qty, 0)} items)  
                : ${cartItems.reduce((a, c) => a+c.price * c.qty, 0)}€ </h3>
                <button id="checkout-button" class="primary" type="button"> Valider et payer </button>
            </div> 
        </div>

        `;},
};

export default CartScreen;