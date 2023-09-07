import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";



const SigninScreen = {
    after_render: ()=>{
        document.getElementById('signInForm').addEventListener('submit', async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await signin({
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
            });
            
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else {
                setUserInfo(data);
                console.log('contenu de getUserInfo depuis signinScreen: ', getUserInfo());
                redirectUser()
            }
        });
    },
    render: ()=>{
        if(getUserInfo().name){
            redirectUser();
        }
    return  `
        <div class="form-container">
            <form id="signInForm" class="in-fooormer">
                <ul class="form-items">
                    <li>
                        <h1>Log in</h1>
                    </li>
                    <li><label for="email">Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                    <input type="email" id="email" name="email" />
                    </li>
                    <li><label for="password">Mou de passe &nbsp;</label>
                    <input type="password" id="password" name="password"/>
                    </li>
                    <li><button type="submit" class="primary">Sign in</button></li>            
                    <li>
                        <div>
                        Nouvel utilisateur?
                        <a href="/#/register">Creer votre compte</a>
                        </div>
                    </li>
                    </ul>
                </form>
            </div>
        `;
    },
}
export default SigninScreen;