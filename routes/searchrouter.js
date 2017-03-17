var express=require('express');
var searchRouter=express.Router();
var Controller=require('./../controller/controller');

searchRouter.route('')
 .get(Controller.get);

module.exports=searchRouter;
