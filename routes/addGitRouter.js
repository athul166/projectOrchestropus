var express=require('express');

var addGitRouter=express.Router();

var Controller=require('./../controller/controller');



addGitRouter.route('')

.post(Controller.addGitRepo);







module.exports=addGitRouter;