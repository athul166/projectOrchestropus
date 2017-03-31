var Workflow=require('./../models/workflow');
const yaml = require('js-yaml');
//var mongo=require('mongodb');
var mongo=require('mongodb');
var url = "mongodb://localhost:27017/workflowsandlanpacks";
const fs = require('fs');

 const spawn = require('child_process').spawn;






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
					//console.log(docs);
					res.json(docs);
			}
	})
}




var get1=function(req,res){
	var name=req.query.name;
	console.log("name   "+name);
	
 	Workflow.find({"workflow_name":name},function(err,docs){
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
var add = function(req,res){
			 var workflow = new Workflow(req.body);
			 console.log(req.body);
			 var json = yaml.safeLoad(req.body.text);
		//console.log("name is  "+req.body.workflowName);
			 var item={
									 workflow_name: req.body.workflowName,
									 creator: req.body.creatorName,
									 description: req.body.description,
									 tags:req.body.tags,
									 workflows:json


			 };
			 mongo.connect(url,function(err,db)
			 {
					 db.collection('workflows').insertOne(item,function(err, result) {
									 if (err) {
											 console.log('---- DB add error <<=== ' + err + ' ===>>');
									 } else {
											 console.log("+-+- Workflow add status(+1-0) <<=== " + result.result.n + " ===>>");
											 res.send('Successfully added.');
											 db.close();
									 }
							 })



					 });


	 }

	 



	  var addGitRepo=function(req,res){

				console.log("in asdsadsa");

                   var repo_name=req.body.languagepackName;

			 console.log(repo_name);


			}



			          	var addLang = function(req,res){

							// var languagepack = new LanguagePack(req.body);

							 console.log(req.body);

							 var repo_url=req.body.repo_url;

							 console.log(repo_url);

						 var meta={

									 creator: req.body.creatorName,

									 description: req.body.description,

									 tags:req.body.tags,

									version:req.body.version,

									languagepackName:req.body.languagepackName
							 }

							 createLangPack(req.body.creatorName,req.body.languagepackName,meta,req.body.list);

							// pushCode("first Commmit",repo_url,req.body.creatorName,req.body.languagepackName,meta,req.body.list);


				};





var createLangPack = function createLangPack(creator, lpname, meta,list) {

  console.log("asasasasasasasasasas");

    var filedata = JSON.stringify(meta);

    const spawn = require('child_process').spawn



   try {

        var ls = spawn('mkdir', [creator, creator + '/' + lpname])

        spawn('git', ['init', creator + '/' + lpname])







       ls.on('close', code => {

            console.log(`child process exited with code ${code}`);

						var path = './' + creator + '/' + lpname + '/';

             url1 = './' + creator + '/' + lpname + '/' + 'meta' + '.txt';

            var fileWriter = fs.createWriteStream(url1, 'utf8');

            fileWriter.write(filedata);

						list.map((a,e)=>

					 {

					 	createFile(path,a.item,a.code);

					 })

        });

    } catch (ex) {

        console.log('Error')

    }



}





var deleteLangPack = function deleteLangPack(creator,lpname,filename) {



		var path = './' + creator + '/' + lpname + '/' + filename + '.sh';

		console.log(path);



			fs.unlink(path, (err) => {

			  if (err)

					throw err;

	  			console.log('successfully deleted /tmp/hello');

	   		});

	}



var createFile=function createFile(path,fname,code)

{

	  console.log("url is  "+path);

     path1=path;

		path1=path1+fname+'.sh';

		var fileWriter = fs.createWriteStream(path1, 'utf8');

		fileWriter.write(code);;





}


var del = function(req,res) {



				var creator = req.body.creatorName;

				var languagepackName = req.body.languagepackName;

				var filename = req.body.filename;

        console.log(filename);

				deleteLangPack(req.body.creatorName,req.body.languagepackName,req.body.filename);

		}





	 var delete1 = function(req,res){

             mongo.connect(url, function(err, db) {
        if (err) {
            console.log('---- DB connection error <<=== ' + err + ' ===>>');
        } else {
            db.collection('workflows').deleteOne({
                workflow_name: req.body.workflowName
            }, function(err, result) {
                if (err) {
                    console.log('---- DB deletion error <<=== ' + err + ' ===>>');
                } else {
                    console.log("+-+- Workflow delete status(+1-0) <<=== " + result.result.n + " ===>>");
                    res.send('Successfully deleted.');
                    db.close();
                }
            }); // end of delete
        }
    });
        }


 module.exports ={

  	 add:add,

     	get:get,

		delete1:delete1,

		addLang:addLang,

		del:del,

		addGitRepo:addGitRepo,
		get1:get1

  }