require('dotenv').config()

let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded());

var port = process.env.PORT || 8000;

app.use(require('./routes_api'));

app.listen(3000, (param) => {
    console.log("App started at port: "+port);
})