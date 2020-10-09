// DO I NEED THIS ANYMORE ???
let fs = require('fs');

const FILE_NAME = './assets/events.json';

let eventRepo = {
     get: function(resolve,reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
            
        })
    },
    getById: function(id,resolve,reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data).find(x => x.id == id));
            }
            
        })
    }
};

module.exports = eventRepo;