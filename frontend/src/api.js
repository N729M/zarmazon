import axios from 'axios';
import { apiUrl } from "./config";
import {getUserInfo} from './localStorage'

export const getProduct = async (id) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        console.log("API Response:", response.data);

        return response.data;
    } catch(error){
        console.log(error)
        return {
            message:`Erreur envoyée par api.js`,
            error: error.response.data.message || error.message,
        };
    }
};

export const getProducts = async () =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        console.log("API Response:", response.data);

        return response.data;
    } catch(error){
        console.log(error)
        return {
            message:`Erreur envoyée par api.js`,
            error: error.response.data.message || error.message,
        };
    }
};

export const signin = async({email, password}) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return{error: err.response.data.message || err.message }
    }
} 


export const register = async({name, email, password}) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return{error: err.response.data.message || err.message }
    }
} 


export const update = async({name, email, password}) =>{
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return{error: err.response.data.message || err.message }
    }
} 

export const createOrder = async(order) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data : order,
        });
        if(response.statusText !== 'Created' ){
            throw new Error(response.data.message)
        }
        return response.data;
    } 
    catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    }
    
}

export const getOrder= async(id) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !=='OK'){
            throw new Error(response.data.message);
        } 
        return response.data;
    } 
    catch(err) {
        return {error: err.message};
    }
}


export const getMYorders = async() =>{
    try{
    const {token} = getUserInfo();
    const response = await axios({
        url:`${apiUrl}/api/orders/mine?page=${1}&limit=${50}`,
        headers:{
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`,
        }
    });
    if(response.statusText !== 'OK'){
        throw new Error('Something went wrong ' + response.data.message);
    }   
    return response.data
} catch(err){
    return { error: err.response ? err.response.data.message : err.message }
}
}


export const getPPclientID= async() => {
    const response= await axios({
        url:`${apiUrl}/api/paypal/clientId`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.statusText!== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data.clientId;
};

export const payOrder =  async(orderID, paymentResult) => {
    try{
    const {token} = getUserInfo();
    const response = await axios({
        url:`${apiUrl}/api/orders/${orderID}/pay`,
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: paymentResult,
    });
    if (response.status !== 'OK' ){
        throw new Error(`Payment failed <br/>` + response.data.message);
    }
} catch(err){
    return {error: err.response ? err.response.data.message : err.message}
    } 
}


