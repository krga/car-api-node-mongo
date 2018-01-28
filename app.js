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

    res.send(JSON.stringify(carCollection));
});

// GET a specific car in carCollection by the id
app.get("/car/:id", (req, res) => {

    /* find a car with the specific id which has to be
    converted to Int to be able to match the find criteria */
    singleCar = carCollection.find(x => x.id === parseInt(req.params.id));
    console.log(singleCar);

    // send a 404 error Msg. if no such car in the carCollection
    if (typeof singleCar === 'undefined') {
        res.status(404).send('Not found');
    } else {
        res.send(JSON.stringify(singleCar));
    }
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})