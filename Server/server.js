var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var searchRouter = require('./../routes/searchrouter');
var deleteRouter = require('./../routes/deleteRouter');
var jobRouter = require('./../routes/jobRouter');
var addRouter = require('./../routes/addRouter');
var stageRouter = require('./../routes/stageRouter');

var getRouter = require('./../routes/getRouter');
//var retrieveStages = require('./../services/retrieveAllStages');
const client = require('../redisClient').duplicate();

var mongoose = require('mongoose');
var Workflow = require('./../models/workflow');
var Jobs=require('./../models/jobs');

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

// app.get('/jobs',function(req,res){
// 	Jobs.find({},function(err,docs){
//      if(err){
// 	res.status(500);
// 	res.send("Internal errr");
// }else{
// 	//console.log(docs);
//     res.json(docs);
//     }})
// });

app.use('/stages',stageRouter);
app.use('/jobs',jobRouter);
// app.get('/stages',function(req,res){
//   const stagesKey = req.query.jobId + ':stages';
//   client.hgetall(stagesKey, (err, replyMap) => {
//     if(err) { console.error('Error Retrieving Stages:', err); return; }
//     console.log(stagesKey);
//     console.log(replyMap);
//     // const stages = convertHgetReplyToObject(replyMap);
//     // console.log("stages ====> "+stages);
//     res.send(replyMap);
//   });
// });
// function convertHgetReplyToObject(replyMap) {
//   const obj = {};
//   Object.keys(replyMap).forEach((item) => {
//     obj[item] = JSON.parse(replyMap[item]);
//   });
//   return obj;
// }


app.use('/workflows/add',addRouter);
app.use('/workflows/get',getRouter);
app.use('/workflows/delete',deleteRouter);
app.use('/search',searchRouter);

app.listen(6007,function(){
    console.log("Started on PORT 6007");
})
