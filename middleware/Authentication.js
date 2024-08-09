import jwt from "jsonwebtoken";
import { promisify } from "util";

export const authentication = async (req, res, next) => {
    try {
        const { authentication } = req.headers

        if (!authentication) {
            return res.status(400).json("token is required")
        }
        const decoded = await promisify(jwt.verify)(authentication, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token not valid", error: error.message });
    }
};
