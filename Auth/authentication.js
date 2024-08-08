const Authenticate = function (...roles) {
    return async function (req, res, next) {
        if (!roles.includes(req.role)) {
            res.status(403).json({ msg: "forbidden" })
        }
        next()
    }
}

export default Authenticate