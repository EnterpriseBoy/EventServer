let express  = require('express');
let app = express();

let router = express.Router();

router.get('/', function (req,res,next){
    res.send("Event");
});

app.use('/api/',router);