import { getProduct } from '../api';
import {parseRequestUrl, showLoading, hideLoading} from '../utils';
import Rating from '../components/Rating';

const ProductScreen = {
    after_render : () =>{
        const req = parseRequestUrl();
        document.getElementById('addbutton').addEventListener('click', 
        () =>{
            console.log('Button addtocart clicked'); 
            document.location.hash = `/cart/${req.id}`;
        }
        );
    },
    render: async() => {
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id)
        if(product.error){
            return `<div>${product.error}</div>`;
        };
        hideLoading();
        return `
        <div class="product-content">
            <div class="back-to-result">
                <a href="/#/">Retour à la recherche</a>
            </div>
            <div class="details">
                <div class="details-img">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <section>
                <div class="details-info">
                    <ul>
                        <li><h1>${product.name}</h1></li>
                        <li>${Rating.render({value: product.rating, 
                        text: `sur ${product.numreviews} notes`})}
                        </li>
                        <li>Prix: <strong>${product.price}€</strong></li>
                        <li>
                        Description:
                        <div>
                            ${product.descr}
                        </div></li>
                    </ul>
                </div>

                <div class="details-action">
                        <ul>
                            <li>Prix : ${product.price}€</li>
                            <li>Disponibilité: 
                            ${product.countInStock > 0 ? `<span class="success">En stock</span>`
                            : `<span class="danger">Epuisé</span>`}
                            </li>
                            <li>
                            <button class="primary" id="addbutton">Add to Cart</button>
                            </li>
                        </ul>
                </div>
                </section>
            </div>
        </div>
        `
        }
    }


export default ProductScreen;