let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded());

let carCollection = new Array();
carCollection.push({name:"Audi", hp: 200});
carCollection.push({name:"BMW", hp: 220});
console.log(carCollection);

app.get("/car", (req, res) => {
    res.send(JSON.stringify(carCollection));
});

app.post("/car", (req, res) => {
    carCollection.push(req.body);
    res.send(JSON.stringify(carCollection));
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})