import axios from 'axios';
import Rating from '../components/Rating';
import {showLoading, hideLoading} from '../utils'

const HomeScreen = {
    after_render : () =>{},
    render: async () => {
        showLoading();
        try {
            const response = await axios({
                url:"http://localhost:5000/api/products", 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            hideLoading();

            if (!response || (response.status < 200 || response.status > 299))
            {
                return `<div>Network response was not ok. 
                <br/> Status is ${response.status}</div>
                <div>${JSON.stringify(response.data)}</div>`;
                
            }

            const products = response.data;
            
            return `
            <ul id="products-container">
                ${products.map(product => 
                    `
                    <li>
                        <article class="product">   
                            <figure><img class="productimg" src="${product.image}" alt="${product.name}">
                                <caption>Of a la coke</caption>
                            </figure>
                            <a href="#${product._id}" class=""><h3>${product.name}</h3></a>
                            <div class="rating">${Rating.render(
                                {value:product.rating, text: `sur ${product.numreviews} notes`}
                            )}</div>
                            <a href="#${product._id}" class=""><h5>${product.brand}</h5></a>
                            <a href="#${product._id}" class=""><p>${product.descr}</p></a>
                            <p>${product.price} €</p>
                            <div class="flex">
                                <button style="margin-left:14px" class="addbutton">Add now !</button>
                                <button style="background:linear-gradient(45deg, lemonchiffon, peachpuff,lightpink)" class="addbutton">
                                <a href="/#/products/${product._id}">   check that ! </a> </button>
                            </div>
                            
                        </article>
                    </li>
                `).join('\n')}
            </ul>
            `;
            

        } catch (error) {
            console.log('There was a problem with the axios operation:', error.message);

            return `<div>'There was a problem with the axios operation:',
            <br/>
            ${error.message}</div>`;
        }
    }
}

export default HomeScreen;
