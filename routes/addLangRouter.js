var express=require('express');
var addLangRouter=express.Router();
var Controller=require('./../controller/controller');addLangRouter.route('')
.post(Controller.addLang);
module.exports=addLangRouter;