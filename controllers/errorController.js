const httpStatus = require("http-status-codes")

module.exports = {

    "pageNotFoundError" : (req, resp)=>{
        let errorCode = httpStatus.NOT_FOUND;
        resp.status(errorCode);
        resp.render("error",{root: "./"});
    }
}