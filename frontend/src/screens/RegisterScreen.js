import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const RegisterScreen = {
    after_render: ()=>{
        document
        .getElementById('registerForm')
        .addEventListener('submit', async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await register({
                name:document.getElementById('name').value,
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
        });
    },
    render: ()=>{
        if(getUserInfo().name){
            redirectUser();
        }
    return  `
        <div class="form-container">
            <form id="registerForm" class="in-fooormer">
                <ul class="form-items">
                    <li>
                        <h1>Creer votre compte</h1>
                    </li>
                    <li><label for="name">Nom</label>
                    <input type="name" id="name" name="name" />
                    </li>
                    <li><label for="email">Email</label>
                    <input type="email" id="email" name="email" />
                    </li>
                    <li><label for="password">Mou de passe</label>
                    <input type="password" id="password" name="password"/>
                    </li>
                    <li><label for="repassword">Mou de passe</label>
                    <input type="password" id="repassword" name="repassword"/>
                    </li>
                    <li><button type="submit" class="primary">Sign in</button></li>
                
                    <li>
                        <div>
                        Dijà un cante?
                        <a href="/#/login">Connecti vou</a>
                        </div>
                    </li>
                    </ul>
                </form>
            </div>
        `;
    },
}
export default RegisterScreen;