import jwt from 'jsonwebtoken';
import userModel from "./models/userModel";

import  config  from "./config";

export const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      config.JWT_SECRET
    );
  };

export const isAuth = (req,res, next) =>{
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        res.status(401).send({ message: 'Token is not supplied'})
    } else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data)=>{
            if(err){
                res.status(401).send({ message: 'Invalid Token'});
            } else {
                req.user = data;
                next();
            }
        })
    }
}

export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
