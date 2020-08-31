let express  = require('express');
let app = express();

let router = express.Router();

router.get('/', function (req,res,next){
    res.send("Event");
});

app.use('/api/',router);

var server = app.listen(5050, function() {
    console.log('Node server is running on http://localhost:5050..');
});