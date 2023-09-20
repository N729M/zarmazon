import {hideLoading, parseRequestUrl, rerender, showLoading, showMessage} from '../utils';
import { getOrder, getPPclientID, payOrder } from '../api';

const handlePayment = (clientID, totalPrice) =>{
    window.paypal.Button.render({
        env:'sandbox',
        client : {
            sandbox: clientID,
            production: '',
        },
        locale: 'fr_FR',
        style:{
            size: 'responsive',
            color:'white',
            shape:'pill',
            label:'checkout',
        },
        commit: true,
        payment(data, actions){
            return actions.payment.create({
                transactions: [
                    {amount: {total: totalPrice, currency: 'USD',}}
                ],
            });
        },
        onAuthorize(data, actions){
            return actions.payment.execute().then(async()=>{
                showLoading();
                await payOrder(parseRequestUrl().id, {
                    orderID: data.orderID,
                    payerID: data.payerID,
                    paymentID: data.paymentID,
                })
                hideLoading();
                showMessage('Paiement effectue, vous voilà délesté de ce que vous aviez en trop',
                () => {
                    rerender(orderScreen);
                });
            });
        },
    },
    `#paypal-button`
    ).then(()=>{
        hideLoading();
    });
}


const addPPSDK = async(totalPrice) =>{
    const clientID = await  getPPclientID();
    showLoading();
    if(!window.paypal)
{
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypalobjects.com/api/checkout.js';
    script.async = true;
    script.onload = () => handlePayment(clientID, totalPrice);
    script.onerror = () => {
        console.error("Erreur lors du chargement du script PayPal.");
        hideLoading();
    };
    
    document.body.appendChild(script);
} else{
    handlePayment(clientID, totalPrice);
    }
};


const OrderScreen = {
    after_render: async() =>{},
    render: async() => {
        const request =parseRequestUrl();
        const {_id,shipping,payment,orderItems,itemsPrice,shippingPrice,taxPrice,totalPrice, isDelivered, deliveredAt, isPaid, paidAt} = await getOrder(request.id);

        if(!isPaid){
            addPPSDK(totalPrice)
        }

        return `
        <section>
        <h1>Commande numéro ${_id}</h1>
            <div class="order-container-recap">  
                <div class="order-recap">
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
                                `<div class="success">commande bien payée ${paidAt}</div>` :
                                `<div class="erreur">commande non reglée</div>`
                                }
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li><h2>Shopping Cart</h2><div>Prix</div></li>
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
            
                    <div class="order-action sided">
                        <ul>
                            <li><h2>Commande</h2></li>
                            <li><div>Articles</div><div>${itemsPrice}</div></li>
                            <li><div>frais d'envoi</div><div>${shippingPrice}</div></li>
                            <li><div>Taxes</div><div>${taxPrice}</div></li>
                            <li><div>Total de la commande</div><div>${totalPrice}</div></li>
                            <li><div id="paypal-button" class="fw"></div></li>
                            <li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `
    }
    
}
 
export default OrderScreen;