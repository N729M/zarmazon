import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel';
import { generateToken, isAuth } from '../utils';

const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler(async(req,res)=>{
    try{
        const user = new User({
            name: 'admin',
            email:'admin@example.com',
            password: 'zarmazon',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch(err){
        res.status(500).send({message: err.message})
    }
}));

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    console.log('Attempting to login with email:', req.body.email);
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    
    if (signinUser) {
        console.log('User found:', signinUser);
    } else {
        console.log('User not found or invalid password.');
    }

        if(!signinUser){
            res.status(401).send({
                message: 'Invalid email or Password',
            });
        } else {
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                password: signinUser.password,
                isAdmin: signinUser.isAdmin,
                token: generateToken(signinUser),
            })
        }
}));



userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        res.status(404).send({
            message: 'User not found',
        });
        return; // Pour arrêter l'exécution ici si l'utilisateur n'est pas trouvé
    }

    // Mise à jour des champs de l'utilisateur avec les données fournies, sinon conservez les valeurs existantes
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Sauvegardez l'utilisateur mis à jour
    const updatedUser = await user.save();

    // Envoyez une réponse avec les détails de l'utilisateur mis à jour, mais sans le mot de passe
    res.send({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser), // Vous pouvez opter pour ne pas générer un nouveau token ici si vous ne le souhaitez pas
    });
}));


userRouter.post('/register', expressAsyncHandler(async (req,res) => {
    const registeredUser = new User({
        name: req.body.name,
        email: req.body.email,
        password : req.body.password
        });
        const createdUser = await registeredUser.save();
        if(!createdUser){
            res.status(401).send({
                message: 'Invalid user data',
            });
        } else {
            res.send({
                id: createdUser._id,
                email: createdUser.email,
                password: createdUser.password,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            })
        }
}));

export default userRouter;