const mongoose = require('mongoose');

const mongoConnect = new Promise((resolve,reject) => {
    mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true , useUnifiedTopology: true}, (err, response) => {
        if(err){
            reject(err);
        }
        resolve(response);
    })
})

module.exports = mongoConnect;