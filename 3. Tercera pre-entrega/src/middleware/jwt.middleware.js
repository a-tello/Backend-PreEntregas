import jwt from "jsonwebtoken"
import config from "../config.js"

export const jwtValidator = (req, res, next) => {
    const token = req.cookies.token
    console.log(req.cookies);
    console.log({token});
    if(!token) return next()
    const validateUser = jwt.verify(token, config.secretKeyTkn)

    if(validateUser) {
        req.user = {...validateUser.userRes, isLogged:true}
        next()
    }
}

export const verifyTokenAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json("Unauthorized");
        }
        if (decoded.role !== "Administrador") {
            return res.status(403).json("Forbidden");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}