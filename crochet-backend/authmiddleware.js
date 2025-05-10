import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies["_CS-AT"]
        if (!token) {
            return res.status(401).json({ message: "Please login!" });
        }
        const decoded =  jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(403).send({message: "Access to this resource is forbidden!"})
    }
}
 
export { authenticate }