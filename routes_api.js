var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cars', {useNewUrlParser: true});

var carSchema = new mongoose.Schema({ id: 'string', type: 'string', attributes: { name: 'string', hp: 'number' }});
var carModel = mongoose.model("Car", carSchema);


/*  GET all cars in MongoDB collection using standardized JSON transport structure
    according to https://jsonapi.org/about/. The data can also be searched 
    by using the parameter "name" */ 
router.get("/api/cars", (req, res) => {
    if (req.query.name !== undefined && req.query.name.length != 0) {
        carModel.find({ "attributes.name" :  { "$regex": req.query.name, "$options": "i" } })
            .then(cars => {
                res.send(JSON.stringify({data: cars}));
            })
            .catch(err => {
                console.error(err)
            });
    } else {
        carModel.find((err, cars) => {
            if (err) return console.error(err);

            res.send(JSON.stringify({data: cars}));
        });
    }
});

/* insert a new car into the MongoDB collection honouring the attribute definiton 
     https://jsonapi.org/ */
router.post("/api/cars", (req, res) => {
    let carToAdd = {};
    carToAdd.id=Math.random().toString(36).substr(2, 5); // generating 5 random alphanumeric chars as an id
    carToAdd.type='car';
    carToAdd.attributes={ name: req.body.name, hp: req.body.hp};

    var newCar = new carModel(carToAdd);
    newCar.save().then(() => console.log('new Car added!')).catch(err => console.error(err));
    res.status(200).send('new Car added!');
});

// GET a specific car from the MongoDB collection using the id
router.get("/api/cars/:id", (req, res) => {
  
   carModel.findOne({id: req.params.id})
    .then(car => {
        res.send(JSON.stringify({data: car}));
    })
    .catch( err => {
        console.error(err);
        res.send(err);
    })
});

// DELETE a specific car from the MongoDB collection  using the id 
router.delete("/api/cars/:id", (req, res) => {
    carModel.deleteOne({id: req.params.id})
    .then(car => {
        res.status(200).send('Car deleted!');
    })
    .catch( err => {
        console.error(err);
        res.send(err);
    })
});

// change the attributes of a specific car in the MongoDB collection using the id
router.put("/api/cars/:id", (req, res) => {

    carModel.updateOne({id: req.params.id}, {"attributes.name": req.body.name, "attributes.hp": req.body.hp})
    .then(car => {
        res.status(200).send('Car updated.');
    })
    .catch( err => {
        console.error(err);
        res.send(err);
    })
});

module.exports = router;