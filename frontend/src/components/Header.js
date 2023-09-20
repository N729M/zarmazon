import {getUserInfo} from '../localStorage';

const Header = {
    
    render: async()=>{
        const {name, isAdmin} = getUserInfo();
    return `
    <nav id="primarynavbar">
    <a href="/#/">
        <img src="../public/images/zz-lemon.png" alt="" width="270px" >
    </a>
    <figure>
        <img src="../public/images/zzdoor-lemon.png" alt="" height="160px" class="door"> 
    </figure>
    
    
    <ul style="display:flex;">
        <li>
        ${isAdmin?`<a class="navbar-element dashB" href="/#/dashboard">Dashboard </a>`:''}
        </li>

        <li class="navbar-elements">
          <a href="/#/login"><button>Cou nexiant</button></a>
            <a href="/#/register"><button>Un scribciant</button></a>  
        </li>
        <li class="navbar-elements">
            <a href="/#/cart">
                <div style="width:100px;text-align:center">
                0
                <div class="caddy">
                    
                </div>
                </div>
            </a>
            
        </li>
        
    </ul>
</nav>
<nav id="secondarynavbar">
    <h1>An trouve tout chi Zarmazon, mime ta gront maire </h1>
    <ul class="navbar-elements menu">
        <li><a href="">Onfont</a></li>
        <li><a href="">blousant</a></li>
        <li><a href="">houti</a></li>
        <li><a href="">botté</a></li>
        <li><a href="">dvd piratte</a></li>
        <li><a href="">bondannonce</a></li>
        ${name ? `<li><a href="/#/profile">${name}</a></li>` : `<li><a href="/#/login">Mon profile</a></li>`}
    </ul>
</nav>

    `;},

    after_render: async ()=>{

    }
}
 

export default Header;