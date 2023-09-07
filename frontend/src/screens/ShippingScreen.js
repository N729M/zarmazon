import { getUserInfo, getShipping, setShipping } from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = {
    after_render: ()=>{
        document
        .getElementById('shippingForm')
        .addEventListener('submit', async(e)=>{
           e.preventDefault();
           setShipping({
            address: document.getElementById('address').value,
            postalcode: document.getElementById('city').value,
            city: document.getElementById('postalcode').value,
            country: document.getElementById('country').value,
            });
        document.location.hash='/payment';
        });
    },
    render: ()=>{
        const {name} = getUserInfo();
        if(!name){
            document.location.hash='/';
        }
        const {address, city, postalcode, country} = getShipping();
    return  `
        ${CheckoutSteps.render({step1:true, step2: true})}
        <div class="form-container">
            <form id="shippingForm" class="in-fooormer">
                <ul class="form-items">
                    <li>
                        <h1>Votre profil</h1>
                    </li>
                    <li><label for="address">Adresse</label>
                    <input type="text" id="address" name="address" value="${address}" />
                    </li>
                    <li><label for="city">Ville</label>
                    <input type="text" id="city" name="city" value="${city}" />
                    </li>
                    <li><label for="postalcode">Code postal</label>
                    <input type="text" id="postalcode" name="postalcode" value="${postalcode}" />
                    </li>
                    <li><label for="country">Pays</label>
                    <input type="text" id="country" name="country" value="${country}" />
                    </li>
                    
                   
                    <li><button type="submit" class="primary">Mettre à jour</button></li>
                
                    <li><button type="button" id="signout" class="secondary">Deconnexion</button></li>
                    </ul>
                </form>
            </div>
        `;
    },
}
export default ShippingScreen;