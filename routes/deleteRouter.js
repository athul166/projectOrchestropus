var express=require('express');
var deleteRouter=express.Router();
var Controller=require('./../controller/controller');

deleteRouter.route('')
.post(Controller.delete1);


module.exports=deleteRouter;
