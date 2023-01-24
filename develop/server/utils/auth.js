require("dotenv").config();

const jwt = require(process.env.JWT_WEB_TOKEN);

const secret = process.env.SECRET_KEY;
const expiration = process.env.EXPIRATION_TIME