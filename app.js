let express = require('express');
let app = express();

app.get("/", (req, res) => {
    res.send("GET");
});

app.listen(3000, (param) => {
    console.log("App started at port 3000!");
})

