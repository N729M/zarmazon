import { getMYorders, update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: ()=>{
        document.getElementById("signout-button").addEventListener("click", ()=>{
            clearUser();
            document.location.hash= '/';
        });
        document
        .getElementById('profileForm')
        .addEventListener('submit', async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await update({
                name:document.getElementById('name').value,
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
        });
    },
    render: async ()=>{
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash='/';
        }
        const orders = await getMYorders();
    return  `
    <div class="content profile">
        <div class="profile-info">
        <div class="form-container">
            <form id="profileForm" class="in-fooormer">
                <ul class="form-items">
                    <li>
                        <h1>Votre profil</h1>
                    </li>
                    <li><label for="name">Nom</label>
                    <input type="text" id="name" name="name" value="${name}" />
                    </li>
                    <li><label for="email">Email</label>
                    <input type="email" id="email" name="email"  value="${email}" />
                    </li>
                    <li><label for="password">Mou de passe</label>
                    <input type="password" id="password" name="password"/>
                    </li>
                
                    <li><button type="submit" class="primary">Mettre à jour</button></li>
                
                    <li><button type="button" id="signout-button" class="secondary">Deconnexion</button></li>
                </ul>
            </form>
        </div>
        </div>
        <div class="profile-orders">
            <h2>Historique des commandes </h2>
            <table>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                ${orders.length ===0 ? `<tr><td colspan="6">PAs de commande</td></tr>`:
                orders.map(order => `
                <tr>
                    <td>${order._id}</td>
                    <td>${order.createdAt}</td>
                    <td>${order.totalPrice}</td>
                    <td>${order.paidAt || 'No'}</td>
                    <td>${order.deliveredAt || 'No'}</td>
                    <td><a href="/#/order/${order._id}">Details</a></td>
                    
                </tr>
                `).join('\n') // pour se débarasser des virgules entre les props de l'objet
            }
                </tbody>
            </table>
        </div>
    </div>

        
        `;
    },
}
export default ProfileScreen;