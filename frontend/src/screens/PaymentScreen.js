import { getUserInfo, setPayment } from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = {
    after_render: ()=>{
        document
        .getElementById('paymentForm')
        .addEventListener('submit', async(e)=>{
           e.preventDefault();
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked')
            .value;
            setPayment({});
        document.location.hash='/placeorder';
        });
    },
    render: ()=>{
        const {name} = getUserInfo();
        if(!name){
            document.location.hash='/';
        }
    return  `
        ${CheckoutSteps.render({step1:true, step2: true, step3: true})}
        <div class="form-container">
            <form id="paymentForm" class="in-fooormer">
                <ul class="form-items">
                    
                    <li>
                    <h1>Paiement</h1>
                    </li>

                    <li>
                        <div>
                            <input type="radio" name="payment-method" id="paypal" value="paypal"
                            checked />
                            <label for="paypal">Paypal</label>
                        </div>
                    </li>
                    <li>
                    <div>
                        <input type="radio" name="payment-method" id="Stripe" value="Stripe" />
                        <label for="Stripe">Stripe</label>
                    </div>
                </li>
                   
                    <li><button type="submit" class="primary">Mettre à jour</button></li>
                
                    <li><button type="button" id="signout" class="secondary">Deconnexion</button></li>
                    </ul>
                </form>
            </div>
        `;
    },
}
export default PaymentScreen;