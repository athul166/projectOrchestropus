var express=require('express');
var getRouter=express.Router();
var Controller=require('./../controller/controller');

getRouter.route('')
.get(Controller.get1);


module.exports=getRouter;
