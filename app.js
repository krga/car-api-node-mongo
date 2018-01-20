let express = require('express');
let app = express();

let carCollection = new Array();
carCollection.push({name:"Audi", hp: 200});
carCollection.push({name:"BMW", hp: 220});
console.log(carCollection);

app.get("/", (req, res) => {
    res.send(JSON.stringify(carCollection));
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})