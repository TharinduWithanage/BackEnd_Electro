const express = require('express');
var route = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



//server connection
app.listen(3001, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server litening......");
    }
});

app.use(route);