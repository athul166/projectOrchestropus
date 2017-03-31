var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var searchRouter = require('./../routes/searchrouter');
var deleteRouter = require('./../routes/deleteRouter');
var addRouter = require('./../routes/addRouter');
var getRouter = require('./../routes/getRouter');


var mongoose = require('mongoose');
var Workflow = require('./../models/workflow');

var db = mongoose.connect("mongodb://localhost:27017/workflowsandlanpacks");
var url = "mongodb://localhost:27017/workflowsandlanpacks";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
	Workflow.find({},function(err,docs){
     if(err){
	res.status(500);
	res.send("Internal errr");


}else{
	//console.log(docs);
    res.json(docs);
    }})
});


app.use('/workflows/add',addRouter);
app.use('/workflows/get',getRouter);
app.use('/workflows/delete',deleteRouter);
app.use('/search',searchRouter);

app.listen(6007,function(){
    console.log("Started on PORT 6007");
})
