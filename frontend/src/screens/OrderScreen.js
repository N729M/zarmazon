import {
    parseRequestUrl,
    showLoading,
    hideLoading,
    showMessage,
    rerender,
  } from '../utils';
  import { getOrder, getPaypalClientId, payOrder, deliverOrder } from '../api';
  import { getUserInfo } from '../localStorage';



const OrderScreen = {
    after_render: async() =>{},
    render: async() => {
        const request =parseRequestUrl();
        const {_id,shipping,payment,orderItems,itemsPrice,shippingPrice,taxPrice,totalPrice, isDelivered, deliveredAt, isPaid, paidAt} = await getOrder(request.id);
        return `
            <div>
               <h1>Commande numéro ${_id}</h1>
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address},
                                ${shipping.city},
                                ${shipping.postalcode},
                                ${shipping.country},
                            </div>
                            ${isDelivered ?
                            `<div class="success">livrée à ${deliveredAt}</div>` :
                            `<div class="erreur">non livrée</div>`
                            }
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Moyen de paiement : ${payment.paymentMethod}
                            </div>
                            ${isPaid ?
                                `<div class="success">payée ${paidAt}</div>` :
                                `<div class="erreur">non payée</div>`
                                }
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li><h2>Shopping Cart</h2><div>Price>/div></li>
                                ${orderItems.map((item) => `
                                <li>
                                    <div class="details-img">
                                        <img src="${item.image}" alt="${item.name}" />
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">${item.name}</a>
                                            </div> 
                                            <div>
                                            Quantité : ${item.qty}
                                            </div>
                                        </div>
                                        <div class="cart-price">
                                        ${item.price}€
                                        </div>
                                    </div>
                                </li>
                                `)}
                            </ul>
                        </div>
                    </div>
                    <div class="order-action">
                        <ul>
                            <li><h2>Commande</h2></li>
                            <li><div>Articles</div><div>${itemsPrice}</div></li>
                            <li><div>frais d'envoi</div><div>${shippingPrice}</div></li>
                            <li><div>Taxes</div><div>${taxPrice}</div></li>
                            <li><div>Total de la commande</div><div>${totalPrice}</div></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
    
}
 
export default OrderScreen;