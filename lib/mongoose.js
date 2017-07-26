/**
 * Created by zhdarry on 2017/7/26.
 */
'use strict';
const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.db);
mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to '+ config.db);
});
mongoose.connection.on('error',(err)=>{
    console.log('Mongoose connection error: '+ err);
});
mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose disconnected ');
});
process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    })
});
exports.mongoose = mongoose;