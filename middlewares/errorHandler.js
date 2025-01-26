const errCases = require("../cases")
const errorHandler = (err,req,res,nxt)=>{
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch(statusCode){
        case errCases.VALIDATION_ERROR:
            return res.status(statusCode).json({message:err.message, stackTrace:err.stack})
            break;
        case errCases.UNAUTHORIZED:
            return res.status(statusCode).json({message:err.message, stackTrace:err.stack})
            break;
        case errCases.FORBIDDEN:
            return res.status(statusCode).json({message:err.message, stackTrace:err.stack})
            break;
        case errCases.NOT_FOUND:
            return res.status(statusCode).json({message:err.message, stackTrace:err.stack})
            break;
        case errCases.INTERNAL_SERVER_ERROR:
            return res.status(statusCode).json({message:err.message, stackTrace:err.stack})
            break;
        default:
            break;
        
    }
}

module.exports = errorHandler