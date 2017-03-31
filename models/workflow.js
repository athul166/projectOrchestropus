// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var workflows = new Schema({
// 	workflow_name : {type: String, index:{unique:true}, required: true},
// 	creator : {type: String, required: true},
// 	description : {type: String, required: true},
// 	tags : {type: [String], required: true},
// 	stages :[{
// 		workflows :[{
//          version: {type: String, required: true},
//          stages: {type: {}, required: true}
//      }]
// });
//
// module.exports= mongoose.model('Workflows', workflows);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var workflows = new Schema({
    workflow_name : {type: String, index:{unique:true}, required: true},
    creator : {type: String, required: true},
    description : {type: String, required: true},
    tags : {type: [String], required: true},
    workflows :{
        version: {type: String, required: true},
        stages: {type: {}, required: true}
    }

}, {retainKeyOrder: true});
module.exports= mongoose.model('Workflows', workflows,"workflows");





