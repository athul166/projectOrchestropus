  var Workflows = require('../models/workflow');
var Languagepacks = require('../models/languagepack');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/workflowsandlanpacks');

// workflow seeder

var workflow =[
  new Workflows({
  workflow_name : 'JS-Mocha-Istanbul-Eslint',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','eslint','istanbul','mocha'],
  stages : [{
    version : '1',
    stage : {
      "stages": {
        "gitClone": {
        "type": "stackroute/js/git_clone",
        "input": {
          "REPOSITORY_URL": "{{payload.repoUrl}}",
          "BRANCH": "{{payload.repo_ref}}"
        }
      },
      "build": {
        "type": "stackroute/js/build",
        "depends_on": [
          "gitClone"
        ]
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
  }]
}),
new Workflows({
  workflow_name : 'JS-Grunt-Eslint',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','grunt','eslint'],
  stages : [{
    version : '1',
    stage : {
      "stages": {
        "gitClone": {
          "type": "stackroute/gruntjquery/git_clone",
          "input": {
            "REPOSITORY_URL": "{{payload.repoUrl}}",
            "BRANCH": "{{payload.repo_ref}}"
          }
        },
        "build": {
          "type": "stackroute/gruntjquery/build",
          "depends_on": [
            "gitClone"
          ]
        },
        "eslint": {
          "type": "stackroute/gruntjquery/eslint",
          "input": {
            "INCLUDE": "{{payload.eslint.include}}",
            "EXCLUDE": "{{payload.eslint.exclude}}"
          },
          "depends_on": [
            "build"
          ]
        },
        "grunt": {
          "type": "stackroute/gruntjquery/grunt",
          "depends_on": [
            "build"
          ]
        }
      }
   }
 }]
}),
new Workflows({
  workflow_name : 'JS-Gulp-Istanbul-Eslint',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','gulp','eslint','gulpistanbul'],
  stages : [{
    version : '1',
    stage :{
     "stages": {
      "gitClone": {
        "type": "stackroute/js/git_clone",
        "input": {
          "REPOSITORY_URL": "{{payload.repoUrl}}",
          "BRANCH": "{{payload.repo_ref}}"
        }
      },
      "build": {
        "type": "stackroute/js/build",
        "depends_on": [
          "gitClone"
        ]
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
      "code-coverage": {
        "type": "stackroute/js/gulpistanbul",
        "input": {
          "INCLUDE": "{{payload.codecoverage.include}}",
          "EXCLUDE": "{{payload.codecoverage.exclude}}"
        },
        "depends_on": [
          "build"
        ]
      },
      "whitebox": {
        "type": "stackroute/js/gulp",
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
 }]
}),
new Workflows({
  workflow_name : 'JS-Eslint-Test',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','grunt','eslint','testing'],
  stages : [{
    version : '1',
    stage :{
      "stages": {
        "gitClone": {
          "type": "stackroute/js/git_clone",
          "input": {
            "REPOSITORY_URL": "{{payload.repoUrl}}",
            "BRANCH": "{{payload.repo_ref}}"
          }
        },
        "build": {
          "type": "stackroute/js/build",
          "depends_on": [
            "gitClone"
          ]
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
        "whitebox": {
          "type": "stackroute/js/testing",
          "depends_on": [
            "build"
          ]
        }
      }
   }
 }]
}),
new Workflows({
  workflow_name : 'JS-Eslint',
  creator : 'Henry Page',
  description : 'For server side JS CI',
  tags : ['js','javascript','eslint'],
  stages : [{
    version : '1',
    stage :{
     "stages": {
      "gitClone": {
        "type": "stackroute/js/git_clone",
        "input": {
          "REPOSITORY_URL": "{{payload.repoUrl}}",
          "BRANCH": "{{payload.repo_ref}}"
        }
      },
      "build": {
        "type": "stackroute/js/build",
        "depends_on": [
          "gitClone"
        ]
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
      }
    }
   }
 }]
}),
];
for(var i=0;i< workflow.length;i++) {
  workflow[i].save((err,res) => {console.log(err,res)});
}

//Language pack seeder

var lanpacks = [
  new Languagepacks({
  lanpack_name : 'git',
  creator : 'akila',
  description: 'This language pack will have only git clone command',
  tags: ['clone','git'],
  version :'1'
}),
  new Languagepacks({
  lanpack_name : 'js',
  creator : 'akila',
  description: 'This language pack will have all stages required to run a js workflow',
  tags: ['eslint','build','mocha','gulp','grunt','istanbul','testing'],
  version :'1'
})
];

for(var i=0;i<lanpacks.length;i++){
lanpacks[i].save((err,res) => {console.log(err,res)});
}
