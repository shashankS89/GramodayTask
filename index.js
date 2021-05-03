const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

const {createRep,getRep} = require('./routes');
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/reportDB', { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

router.route('/').get(getRep)


router.route('/create').post(createRep)

/*app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err : err.message || 'Something went wrong'
    })
});*/

app.use('/reports',router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});