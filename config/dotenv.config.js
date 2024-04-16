const dotenv = require("dotenv");

// determine the server
const configFile = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev"

dotenv.config({path : configFile});