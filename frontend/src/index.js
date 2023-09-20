import HomeScreen from './screens/HomeScreen';
import Error404Screen from './screens/Error404Screen';
import ProductScreen from './screens/ProductScreen';
import {parseRequestUrl, showLoading, hideLoading} from './utils' ;
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import ProductListScreen from './screens/ProductListScreen';

    const routes = {
        '/': HomeScreen,
        '/dashboard': DashBoardScreen,
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
        '/productlist': ProductListScreen,
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