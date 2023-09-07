import HomeScreen from './screens/HomeScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import ProductScreen from './screens/ProductScreen.js';
import {parseRequestUrl, showLoading, hideLoading} from './utils.js' ;
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import Header from './components/Header.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';

    const routes = {
        '/': HomeScreen,
        '/products/:id': ProductScreen,
        '/order/:id': OrderScreen,
        '/cart/:id': CartScreen,
        '/cart': CartScreen,
        '/login': SigninScreen,
        '/register': RegisterScreen,
        '/profile': ProfileScreen,
        '/shipping': ShippingScreen,
        '/payment': PaymentScreen,
        '/placeorder': PlaceOrderScreen,
    }
    const router = async () => {
        showLoading();
        const req = parseRequestUrl();
        const parseUrl = (req.resource ? `/${req.resource}`: '/') +
        (req.id? '/:id' : '') + (req.verb ? `/${req.verb}` : '');
        console.log('contenu de req dpuis index.js: ', req);

        const screen = routes[parseUrl]? routes[parseUrl]: Error404Screen; 

        const header = document.getElementById('header-container');
        header.innerHTML = await Header.render();
        await Header.after_render();

        const main = document.getElementById("grid-container");
        main.innerHTML = await screen.render();

        console.log('contenu de screen depuis index.js: ', screen);

        if(screen.after_render) await screen.after_render();

        hideLoading()
    }
window.addEventListener("load", router );
window.addEventListener("hashchange", router );