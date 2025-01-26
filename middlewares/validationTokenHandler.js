const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validationToken = asyncHandler(async (req, res, nxt) => {
    let token = req.cookies.access_token;

    // If not in cookies, check Authorization header
    if (!token) {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated Or Invalid Token" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized Token" });
        }
        req.user = decoded.user; // Ensure this matches the structure of your token payload
        nxt();
    });
});


const onlyAdmin = asyncHandler(async(req,res,nxt)=>{
    if(!req.user.isAdmin){
        return res.status(403).json({message:"You are not authorized to access this route"})
    }
    nxt();
})

const userOradmin = asyncHandler(async(req,res,nxt)=>{
    if(!req.user.isAdmin || !req.user.isUser){
        return res.status(403).json({message:"You are not authorized to access this route"})
    }
    nxt();
})

module.exports = {validationToken,onlyAdmin,userOradmin}