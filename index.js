let eventRepo = require('./Repos/eventsRepo')
let express  = require('express');
const { request } = require('express');

let app = express();

let router = express.Router();

//let food= eventRepo.get();

//course from Mosh https://www.youtube.com/watch?v=pKd0Rpw7O48

router.get('/', function (req,res,next){
    eventRepo.get(data => {
        res.status(200).json({
            "status":200,
            "statusText":"OK",
            "message":"All food returned.",
            "data":data
        });
    }, err => {
        next(err);
    });
});

router.get('/:id',function(req,res,next){
    eventRepo.getById(req.params.id,function(data){
        if(data){
            res.status(200).json({
                "status":200,
                "statusText":"OK",
                "message":"Single Event Retrived",
                "data":data
            });
        }
        else{
            res.status(404).json({
                "status":400,
                "statusText":"Not Found",
                "message":"The Event with '"+req.params.id+" 'could not be found",
                "error":{
                    "code":"not found",
                    "message":"The Event with '"+req.params.id+" 'could not be found"
                }
            });
        };
    });
});

app.use('/api/',router);

//PORT
const PORT  = process.env.port || 5050; 
var server = app.listen(PORT, function() {
    console.log(`Node server is running on http://localhost:${PORT}..`);
});