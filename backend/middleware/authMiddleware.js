import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

//Protect Route
const protect = asyncHandler(async(req, res, next)=>{
    let token;

    //read the JWT from the cookie
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token fail')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token')
    }
});


const admin = asyncHandler(async(req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not Authorized as admin')
    }
})

export {protect, admin}