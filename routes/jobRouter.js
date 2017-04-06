var express=require('express');
var jobRouter=express.Router();
var Controller=require('./../controller/controller');

jobRouter.route('')
.get(Controller.job);


module.exports=jobRouter;
