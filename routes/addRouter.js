var express=require('express');
var addRouter=express.Router();
var Controller=require('./../controller/controller');

addRouter.route('')
.post(Controller.add);


module.exports=addRouter;
