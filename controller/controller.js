var Workflow=require('./../models/workflow');

var get=function(req,res){
	var tag=req.query.search_item;
	console.log("tagsss   "+tag);
	var t=tag.split(',');
	console.log(t);
 	Workflow.find({ $or :[{"tags":{"$all":t}},{"workflow_name":t}]},function(err,docs){
    if(err){
			res.status(500);
			res.send("Internal errr");
			}
			else{
					console.log("result of server ");
					console.log(docs);
					res.json(docs);
			}
	})
}
// var add=function(req,res){
//    var movie=new Movie(req.body);
//    movie.save(function(err){
//    	if(err){
//    		res.status(500);
//    		res.send("Failed");
//    	}
//    	else
//    	{
//    		res.status(201);
//    		res.send(movie);
//    	}
//  })
// }
module.exports={
  	// add:add,
  	get:get
  }
