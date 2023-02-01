//JWT is a standard for securely transmitting information between parties as a JSON object
const jwt = require('jsonwebtoken');

//used secret key to verify that it was created by the sender and that it has not been tampered with
const secret = process.env.SECRET_KEY;
const expiration = process.env.EXPIRATION_TIME;

module.exports = {
    authMiddleware: function ({req}) {
    //checks for token in a POST request data or checks for token in the URL or checks for token in headers. 
    let token = req.body.token || req.query.token || req.headers.authorization
     
    /*splitting the value of token by spaces then pop to retrieve the last item from 
      the result array then trim to remove any whitespace from the beginning and end of token
    */
    if(req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    // if no token is handed or returned  upon the request
    if(!token) {
        return req
    }
    // verifying if the token is valid and verifying the token is not expired
    try {
        const { Data } = jwt.verify(token, secret, {maxAge: expiration});
        req.user = Data;
    } catch (err) {
        res.status(400).json(err)
    }
    return req
    },
    //give token upon signing 
    signToken: function({userName, email, _id}) {
        const payload = { userName, email, _id};

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration});
    }
};
