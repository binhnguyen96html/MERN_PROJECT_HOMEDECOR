//jwt: dung de tao token
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
   
    //set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000 //30days
        // maxAge: 10*1000
    })

    // console.log(token)
}

export default generateToken;