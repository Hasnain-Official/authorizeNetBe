const PORT = 5000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const xss = require('express-xss-sanitizer');
const rate_limitter = require('express-rate-limit');
const helmet = require('helmet');
const routes = require("./src/routes/routes");

app.use(bodyParser.json({limit : '4gb'}));
app.use(bodyParser.urlencoded({
    limit : '4gb',
    extended: true,
}));
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("*", (req, res) => {
    return res.status(404).json({
        status : false,
        message : "The page you are looking for does not exists."
    })
});

app.listen(PORT, () => {
    console.log("---------------------------------");
    console.log(`  🚀 App is listening on ${PORT} 🚀`);
    console.log("---------------------------------");
});