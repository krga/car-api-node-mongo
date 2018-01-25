let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded());

let carCollection = new Array();
let carIdCounter = 1;
//carCollection.push({name:"Audi", hp: 200});
//carCollection.push({name:"BMW", hp: 220});

console.log(carCollection);

app.get("/car", (req, res) => {
    res.send(JSON.stringify(carCollection));
});

app.post("/car", (req, res) => {
    carToAdd = req.body;
    carToAdd.id=carIdCounter++;

    carCollection.push(carToAdd);
    
    res.send(JSON.stringify(carCollection));
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})