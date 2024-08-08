import jwt from 'jsonwebtoken'
import { promisify } from 'util'
const Authorize = async (req, res, next) => {
    let {auhorization} = req.headers
    if (!auhorization)
        return res.status(403).json({msg: "please provide token"})
    try{
        let decoded = await promisify(jwt.verify)(auhorization, process.env.JWT_SECRET)
        req.role = decoded.role
        next()
    }catch(err){
        return res.status(403).json({msg: "invalid token"})
    }
}

export default Authorize