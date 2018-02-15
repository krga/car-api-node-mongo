var express = require('express');
var router = express.Router();

let carCollection = [];
let carIdCounter = 1;

// GET all cars in carCollection
router.get("/car", (req, res) => {
    res.send(JSON.stringify(carCollection));
});

// insert a new car into the carCollection
router.post("/car", (req, res) => {
    carToAdd = req.body;
    carToAdd.id=carIdCounter++;
    carCollection.push(carToAdd);

    res.status(200).send('Car added.');
});

// GET a specific car in carCollection by the id
router.get("/car/:id", (req, res) => {

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

router.delete("/car/:id", (req, res) => {
    let carToDeleteId = parseInt(req.params.id);

    for (let i = 0; i < carCollection.length; i++) {     
        if (carCollection[i].id === carToDeleteId) {
            carCollection.splice(i, 1);
            res.status(200).send('Car deleted.');
        }
    }
    res.status(404).send('Not found');
});

router.put("/car/:id", (req, res) => {
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

module.exports = router;