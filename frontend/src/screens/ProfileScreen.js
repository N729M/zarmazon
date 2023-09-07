import { update } from "../api";
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
    render: ()=>{
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash='/';
        }
    return  `
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
        `;
    },
}
export default ProfileScreen;