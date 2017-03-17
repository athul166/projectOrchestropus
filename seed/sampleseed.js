var Workflows = require('../models/workflow');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newSample1');

var workflow =  new Workflows({
  workflow_name : 'JS-Mocha-Istanbul-Eslint',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','eslint','istanbul'],
  stages :{
      version : '1',
      stage : {
        "gitClone": {
        "type": "stackroute/js/git_clone",
        "input": {
          "REPOSITORY_URL": "{{payload.repoUrl}}",
          "BRANCH": "{{payload.repo_ref}}"
        }
      },
      "eslint": {
        "type": "stackroute/js/eslint",
        "input": {
          "INCLUDE": "{{payload.eslint.include}}",
          "EXCLUDE": "{{payload.eslint.exclude}}"
        },
        "depends_on": [
          "build"
        ]
      },
      "build": {
        "type": "stackroute/js/build",
        "depends_on": [
          "gitClone"
        ]
      },
      "code-coverage": {
        "type": "stackroute/js/istanbul",
        "input": {
          "INCLUDE": "{{payload.codecoverage.include}}",
          "EXCLUDE": "{{payload.codecoverage.exclude}}"
        },
        "depends_on": [
          "build"
        ]
      },
      "whitebox": {
        "type": "stackroute/js/mocha",
        "input": {
          "INCLUDE": "{{payload.whitebox.include}}",
          "EXCLUDE": "{{payload.whitebox.exclude}}"
        },
        "depends_on": [
          "build"
        ]
      }
    }
  }
});

workflow.save((err,res) => {console.log(err,res)});
