var express=require('express');
var stageRouter=express.Router();
var Controller=require('./../controller/controller');

stageRouter.route('')
.get(Controller.stage);


module.exports=stageRouter;
