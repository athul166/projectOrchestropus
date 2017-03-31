import React, { Component } from 'react';
import * as d3 from 'd3';
import yaml from 'js-yaml';
// import yamlLint from 'yaml-lint';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import Graph from './Graph';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
var YAML = require('json2yaml');
import SnackBar from 'react-material-snackbar';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import {  Link } from 'react-router';

class Workflow extends Component {
  constructor(props) {
    super(props);
    this.state={
      text: '',
      textChanged: '',
      nodes: [],
      tempNodeName: [],
      links: [],
      filename:'',
      errorText: '',
      statePresent: true,
      creatorName:'',
      workflowName:'',
      tags:'',
      description:'',
      open:false,
      url:'',
      clearFunc:'',
      showSnack:false,
      open: false,
      obj:{},
      open_ok:false
    }
    this.updateFilename=this.updateFilename.bind(this);
    this.showFileName=this.showFileName.bind(this);
    this.setFocus=this.setFocus.bind(this);
    this.save=this.save.bind(this);
    this.handleRequestClose=this.handleRequestClose.bind(this);
    this.addUpload=this.addUpload.bind(this);
    this.handleOk=this.handleOk.bind(this);
    console.log("props  ",this.props);



  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRequestClose() {
    this.setState({
      showSnack: false,
    });
  };

  twoFunc(e) {
    this.showFileName(e);
    setTimeout(this.setFocus,100);
   //setTimeout(function(){ this.setFocus(); }, 3000);
  }

  setFocus() {
    this.refs.editor.getCodeMirror().focus();
    console.log("linecount is"+this.refs.editor.getCodeMirror().lineCount());
    this.refs.editor.getCodeMirror().setCursor(this.refs.editor.getCodeMirror().getValue().split("\n").length, 0);
  }

  updateFilename(e) {
    this.setState({filename:e.target.value});
  }

  showFileName(e) {
    var temp = e.target.files[0];
    var ext = temp.name.split('.').pop().toLowerCase();
    if(ext!="yml")
    {
      alert('Only yml file supported.');
    }
    else {
      var fil = document.getElementById("myFile");
      console.log(fil);
      var that = this;
      this.setState({filename:fil.files[0].name});
      var reader = new FileReader();
      reader.onload = function(event) {
          if(true){
            that.setState({text:event.target.result});
            that.handleChange(event.target.result);
            //that.split();
          }
      };
      reader.readAsText(temp);
    }
  }

  handleChange = (event) => {
   if(!event) { this.setState({textChanged: '', errorText: ''});}
     try{
      yaml.loadAll(event, (doc) => {
        this.setState({textChanged: doc, errorText: ''});
      });
     }
    catch(err){
     console.log("message is "+ err.message);
     this.setState({errorText:err.message});
      var startindex=err.message.indexOf("at line") + 8;
        var endindex=err.message.indexOf("column")-2;
        var errrow=err.message.substring(startindex,endindex);
        // console.log(errrow);
    }
      this.setState({ text:event});
      this.forceUpdate(this.createJSON);
  }



handleOk()
{

}

  componentDidMount() {
     var that=this;
     var c=0;

     if(this.props.params!=undefined)
     {
      console.log("yes")
      console.log("obj is ",this.props.params.templateName);
    axios.get('http://localhost:6007/workflows/get?name='+this.props.params.templateName,)
  .then(function (response) {
    console.log("data is "+response);
    that.setState({obj:response.data[0]});
    console.log("obj is ",that.state.obj);
 console.log("name is ",that.state.obj.workflow_name);
   let jsonData = that.state.obj.workflows;
     console.log(jsonData);
     console.log(YAML.stringify(jsonData));
     that.setState({text:YAML.stringify(jsonData),creatorName:that.state.obj.creator,workflowName:that.state.obj.workflow_name,description:that.state.obj.description,tags:that.state.obj.tags})


 })
  .catch(function (error) {
    console.log(error);
  });



}
else
{
  console.log("not")
  console.log(this.state.obj);
  this.setState({obj:null})
}

 var clearFunc = setInterval(this.save, 8000);
       this.setState({clearFunc:clearFunc});

    }

 // componentWillmount(){
 //   var that=this;
 //      console.log("obj is ");

 //    axios.get('http://localhost:6007/workflows/get',{

 //    workflowName: that.props.params.templateName

 //  })
 //  .then(function (response) {
 //    console.log(response);
 //  this.setState({obj:response});
 //    console.log("obj is ",this.state.obj);


 // })
 //  .catch(function (error) {
 //    console.log(error);
 //  });

 // }


  componentWillUnmount(){

  // console.log("obj is ",this.state.obj);

    clearInterval(this.state.clearFunc);
  }


    save(){

     // alert("name is this  "+document.getElementById('creatorName').value);
     //var c=JSON.stringify(document.getElementById('creatorName').value);

      //this.setState({creatorName:c});
    //  console.log(this.state.creatorName);
    console.log("in save")
      var that=this;
     // var creator=this.state.creatorName;
      //alert(this.state.creatorName);
  if(this.state.creatorName=='')
  {
   // alert("Creator Name Can't be empty");
  }else
  if(this.state.workflowName=='')
  {
     //alert("Workflow Name Can't be empty")
  }else
  if(this.state.tags=='')
  {
     //alert("Tags Can't be empty")
  }else
  if(this.state.description=='')
  {
     //alert("Descripion Can't be empty")
  }else
  if(this.state.text=='')
  {
       //alert("Workflow File Can't be empty")
  }
  else
  {
      this.setState({showSnack:true});
      //alert("Auto Save Enabled");

    axios.post('http://localhost:6007/workflows/delete',{
   // creatorName: that.state.creatorName,
    workflowName: that.state.workflowName,
    // tags:that.state.tags,
    // description:that.state.description,
    // text:that.state.text
  })
  .then(function (response) {
  //  alert("delted");
    console.log(response);

 })
  .catch(function (error) {
    console.log(error);
  });


     axios.post('http://localhost:6007/workflows/add',{
      creatorName: that.state.creatorName,
      workflowName: that.state.workflowName,
      tags:that.state.tags,
      description:that.state.description,
      text:that.state.text
    })
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
    }

    addUpload(){
      var that = this;
       axios.post('http://35.154.207.12/workflow/add',{
       creatorName: that.state.creatorName,
      workflowName: that.state.workflowName,
      tags:that.state.tags,
      description:that.state.description,
      text:that.state.text
    })
    .then(function (response) {
      console.log(response);
       that.setState({open_ok:true});
       alert("added");

    })
    .catch(function (error) {
      console.log(error);
    });



    }

    onCreator(event)
    {
      this.setState({creatorName:event.target.value});
      //alert(this.state.creatorName);
    }
    onName(event)
    {
    this.setState({workflowName:event.target.value});
    }
    onTags(event)
    {
    this.setState({tags: event.target.value});
    }
    onDesc(event)
    {
    this.setState({description:event.target.value});
    }




  createJSON() {
    let jsonData = this.state.textChanged;
    let nodes = [];
    let links = [];
    if(jsonData instanceof Object) {
      if(jsonData['stages']) {
        const stages = Object.keys(jsonData['stages']);
        stages.map((stageName) => {
          if(jsonData['stages'][stageName] instanceof Object) {
            let tempFlag = false;
            for(let j = 0; j< nodes.length; j++) {
              if(nodes[j]['name'].trim() === stageName.trim()) {
                tempFlag = true;
              }
            }
            if(!tempFlag) {
              nodes.push({ name: stageName});
            }
            if(jsonData['stages'][stageName]['depends_on']) {
              const targets = jsonData['stages'][stageName]["depends_on"];
              for(let i = 0; i< targets.length; i++ ){
                if(targets[i]) {
                  let flag = false;
                  let linkFlag = false;
                  let sourceIndex = null;
                  let targetIndex = null;
                  for(let j = 0; j< nodes.length; j++) {
                    // To find the source index
                    if(nodes[j]['name'].trim() === stageName && !sourceIndex) {
                      sourceIndex = j;
                    }
                    // To find the target index
                    if(nodes[j]['name'].trim() === targets[i].trim() && !targetIndex) {
                      targetIndex = j;
                    }

                    if(nodes[j]['name'].trim() === targets[i].trim()) {
                      flag = true;
                    }

                    if(sourceIndex != null && targetIndex!= null && !linkFlag) {
                      linkFlag = true;
                      links.push({ source: sourceIndex, target: targetIndex});
                    }
                  }
                  if(flag) {
                    this.setState({ statePresent: true, errorText: ''});
                    // nodes.push({ name: targets[i]});
                  }
                  else { this.setState({ statePresent: false, errorText: targets[i].toString() }); }
                }
                else {
                  this.setState({ statePresent: true, errorText: ''});
                }
              }
            }
          }
        });
        this.setState({ nodes: nodes, links: links});
      }
    }
  else {
      this.setState({ nodes: [], links: [], statePresent: true});
  }
}
  handleOpen = () => {
   this.setState({open: true});
  };

  handleClose = () => {
   this.setState({open: false});
  };

  handleTest = () =>{
    this.setState({open: false});
    axios.post('http://localhost:4070/api/v1/jobs',{
      payload : {
        repoUrl : this.state.url
      },
      template: this.state.textChanged,
      templateName: null
    })
    .then(function(response){
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}
handleChangeUrl(evt)
 {
   this.setState({url:evt.target.value});
   console.log(this.state.url);
 }
  render() {
    const actions = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="YES"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addUpload}
      />,
    ];

    const actions_ok = [

      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleOk}
      />,
    ];
  //  console.log("propsssssssssssssssss");
  // //  console.log(this.props.params.userId);
  //   console.log('inside workflow');
    var options = {
    lineNumbers: true,
    gutters: ["CodeMirror-lint-markers"],
          lint: true,
          mode: "text/x-yaml",

  }
  const actions_test = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Execute"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleTest}
        />,
      ];

    const { width, height } = this.props;
    const styles = {
      graph: {
      width,
      height,
      bottom: 0,
      position: 'fix',
      border: '1px solid #323232',
      },
     button: {
      margin: 20,
      },
       button1: {
      margin: 8,
      },
     exampleImageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 20,
      left: 0,
      width: '100%',
      opacity: 0,
   },
    errorStyle: {
      color: 'red',
    },
};

    return (
     <div> {this.state.obj==null?
      <div className="App">


       <Snackbar
          open={this.state.showSnack}
          message="Auto Save Enabled"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />




       <MuiThemeProvider>
      <GridList cellHeight="auto" cols={2} style={{marginTop:"2%"}}>
        <GridTile>
          <div >
          <input type = 'text' id = 'creatorName'  name = 'creator' onChange={this.onCreator.bind(this)} placeholder="Creator Name" style={{'border':0,'fontSize':'18'}} /> /
           <input type = 'text' id = 'workflowName' name = 'name' onChange={this.onName.bind(this)} placeholder="   Name Of WorkFlow" style={{'border':0,'fontSize':'18'}} />
 <br/>
          < input type = 'text' id = 'tags' name = 'Tags' onChange={this.onTags.bind(this)} placeholder="Tags" style={{'border':0,'fontSize':'18'}} /><br/>
          <textarea type='textarea' id = 'description' rows={2} cols={50}  onChange={this.onDesc.bind(this)} placeholder="Descripion"  style={{'border':0,'fontSize':'18'}}/>
 <br/><br/>
          </div>
          <div >
          <CodeMirror ref="editor" onChange={this.handleChange.bind(this)} value={this.state.text}  options={options} />
          <textarea type='textarea' rows={45} cols={80} value={ this.state.textChanged } style={{'display':'none'}}/>

           </div>
           <div>
           <br/>
          {this.state.statePresent ? <textarea type='textarea' rows={3} cols={72} style={{'resize':'none'}} value={this.state.errorText} id='text_area'/> : <textarea type='textarea' rows={3} cols={72} style={{'resize':'none'}} value={"Warning: "+this.state.errorText+" is not present"} id='text_area1'/>}
                   </div>

                             <div style={{marginLeft:"1%"}}>
                                <TextField
                                      hintText="Enter File Name"
                                      floatingLabelFixed={true}
                                      value={this.state.filename}
                                      onChange={this.updateFilename}
                                />
                                <RaisedButton
                                      id="browsewf"
                                      label="Browse"
                                      labelPosition="before"
                                      style={styles.button}
                                      containerElement="label" primary={true}>
                                       <input type="file" id="myFile" style={styles.exampleImageInput} onChange={this.twoFunc.bind(this)} />
                                </RaisedButton>
                                <RaisedButton label="Test" onTouchTap={this.handleOpen} />
                                <Dialog
                                  title="Test"
                                  actions={actions_test}
                                  modal={false}
                                  open={this.state.open}
                                  onRequestClose={this.handleClose}
                                >
                                  <TextField hintText="Enter Git Repo Url" onChange={this.handleChangeUrl.bind(this)} style={{'width':'80%'}} /><br />
                                </Dialog>
                                 <RaisedButton label="Test"   />
                                   <RaisedButton label="Upload"  style={styles.button1} onTouchTap={this.handleOpen}/>
                                    <Dialog
                                          title="Are You Sure You Want To Upload This Workflow ?"
                                          actions={actions}
                                          modal={true}
                                          open={this.state.open}
                                        >
                                    </Dialog>
      {this.state.open_ok? <Dialog
                                          title="Successfully uploaded"
                                          actions={actions_ok}
                                          modal={true}
                                          open={this.state.open_ok}
                                        >
                                    </Dialog>:<p></p>}
                               </div>


        </GridTile>
      <GridTile style={{height:"650px",marginTop:"0%"}}>
        <Graph styles={ styles.graph } nodes={ this.state.nodes } links={ this.state.links } width={ 700} height={ 630 } />
         </GridTile>
         </GridList>

           </MuiThemeProvider>
      </div> :
       <div className="App">
         <Snackbar
          open={this.state.showSnack}
          message="Auto Saved"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />

       <MuiThemeProvider>
      <GridList cellHeight="auto" cols={2} style={{marginTop:"2%"}}>
        <GridTile>
          <div >
          <input type = 'text' id = 'creatorName'    onChange={this.onCreator.bind(this)} value={this.state.creatorName} style={{'border':0,'fontSize':'18'}} /> /
           <input type = 'text' id = 'workflowName'  onChange={this.onName.bind(this)} value={this.state.workflowName}style={{'border':0,'fontSize':'18'}} />
 <br/>
          < input type = 'text' id = 'tags' name = 'Tags' onChange={this.onTags.bind(this)} value={this.state.obj.tags} style={{'border':0,'fontSize':'18'}} /><br/>
          <textarea type='textarea' id = 'description' rows={2} cols={50}  onChange={this.onDesc.bind(this)} value={this.state.description}  style={{'border':0,'fontSize':'18'}}/>
 <br/><br/>
          </div>
          <div >
          <CodeMirror ref="editor" onChange={this.handleChange.bind(this)} value={this.state.text}  options={options} />
          <textarea type='textarea' rows={45} cols={80} value={ this.state.textChanged } style={{'display':'none'}}/>

           </div>
           <div>
           <br/>
          {this.state.statePresent ? <textarea type='textarea' rows={3} cols={72} style={{'resize':'none'}} value={this.state.errorText} id='text_area'/> : <textarea type='textarea' rows={3} cols={72} style={{'resize':'none'}} value={"Warning: "+this.state.errorText+" is not present"} id='text_area1'/>}
                   </div>

                             <div style={{marginLeft:"1%"}}>
                                <TextField
                                      hintText="Enter File Name"
                                      floatingLabelFixed={true}
                                      value={this.state.filename}
                                      onChange={this.updateFilename}
                                />
                                <RaisedButton
                                      id="browsewf"
                                      label="Browse"
                                      labelPosition="before"
                                      style={styles.button}
                                      containerElement="label" primary={true}>
                                       <input type="file" id="myFile" style={styles.exampleImageInput} onChange={this.twoFunc.bind(this)} />
                                </RaisedButton>
                                   <RaisedButton label="Test"  />
                                   <RaisedButton label="Upload"  />
                               </div>


        </GridTile>
      <GridTile style={{height:"650px",marginTop:"0%"}}>
        <Graph styles={ styles.graph } nodes={ this.state.nodes } links={ this.state.links } width={ 700} height={ 630 } />
         </GridTile>
         </GridList>

           </MuiThemeProvider>
      </div>}</div>
    );
  }
}

export default Workflow
