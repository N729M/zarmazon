import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import userRouter from './routers/userRouter'
import orderRouter from './routers/orderRouter'

import config from './config' 
import data from './data'

import { getUserById } from './utils'

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('connexion mongodb OK')
}).catch((error)=>{
    console.error('pas de connexion:', error.message);
});

const app = express()

app.use(express.json());
app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use('/public', express.static(path.join(__dirname, '/../frontend/dist/public')));
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

app.get('/api/users/:id', getUserById);

app.get('/api/products', (req,res) =>{
    res.send(data.products)
})
app.get('/api/products/:id', (req,res) =>{
    const product =  data.products.find( (x)=>x._id === req.params.id);
    if(product){res.send(product)}
    else{ res.status(404).send({message: 'article introuvable'})}
})

app.use((err, req ,res, next)=>{
    const status= err.name && err.name === 'Validation Error'? 400 : 500;
    res.status(status).send({message: err.message});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/dist/index.html'));
});

app.listen(5000, () =>{
    console.log('served at port 5000')
})