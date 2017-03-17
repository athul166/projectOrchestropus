var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languagepacks = new Schema({
	lanpack_name : {type: String, index:{unique:true}, required: true},
	creator : {type: String, required: true},
	description : {type: String, required: true},
	tags : {type: [String], required: true},
	version : {type: String, required: true},
});

module.exports= mongoose.model('Languagepacks', languagepacks);
