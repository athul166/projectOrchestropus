var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workflows = new Schema({
	workflow_name : {type: String, index:{unique:true}, required: true},
	creator : {type: String, required: true},
	description : {type: String, required: true},
	tags : {type: [String], required: true},
	stages :[{
		version: {type: String, required: true},
		stage: {type: {}, required: true}
	}]
});

module.exports= mongoose.model('Workflows', workflows);
