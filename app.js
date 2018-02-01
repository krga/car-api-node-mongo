let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded());

let carCollection = new Array();
let carIdCounter = 1;

// GET all cars in carCollection
app.get("/car", (req, res) => {
    res.send(JSON.stringify(carCollection));
});

// insert a new car into the carCollection
app.post("/car", (req, res) => {
    carToAdd = req.body;
    carToAdd.id=carIdCounter++;
    carCollection.push(carToAdd);

    res.status(200).send('Car added.');
});

// GET a specific car in carCollection by the id
app.get("/car/:id", (req, res) => {

    /* find a car with the specific id which has to be
    converted to Int to be able to match the find criteria */
    let singleCar = carCollection.find(x => x.id === parseInt(req.params.id));

    // send a 404 error Msg. if no such car in the carCollection
    if (typeof singleCar === 'undefined') {
        res.status(404).send('Not found');
    } else {
        res.send(JSON.stringify(singleCar));
    }
});

app.delete("/car/:id", (req, res) => {
    let carToDeleteId = parseInt(req.params.id);

    for (let i = 0; i < carCollection.length; i++) {     
        if (carCollection[i].id === carToDeleteId) {
            carCollection.splice(i, 1);
            res.status(200).send('Car deleted.');
        }
    }
    res.status(404).send('Not found');
});

app.put("/car/:id", (req, res) => {
    let carToEditId = parseInt(req.params.id);
  
    for (let i = 0; i < carCollection.length; i++) {
        if (carCollection[i].id === carToEditId) {
            carCollection[i].name = req.body.name;
            carCollection[i].hp = req.body.hp;
            res.status(200).send('Car edited.');
        }
    }
    res.status(404).send('Not found');
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})