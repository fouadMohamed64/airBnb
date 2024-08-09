import jwt from 'jsonwebtoken'
import { promisify } from 'util'
const Authorize = async (req, res, next) => {
    let { authorization } = req.headers
    if (!authorization)
        return res.status(403).json({msg: "please provide token"})
    try{
        let decoded = await promisify(jwt.verify)(authorization, process.env.SECRET)
        req.role = decoded.role
        next()
    }catch(err){
        return res.status(403).json({msg: "invalid token",err})
    }
}

export default Authorize