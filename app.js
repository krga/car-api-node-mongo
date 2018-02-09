require('dotenv').config()

let express = require('express');
let app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

let port = process.env.PORT || 8000;

app.use(require('./routes_api'));

app.listen(port, (param) => {
    console.log("App started at port: "+port);
})