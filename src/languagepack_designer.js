import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import LanguagePack from './languagepack.js';
import {  Link } from 'react-router';
import TextField from 'material-ui/TextField';



const style = {
  marginRight: 20,
  float: "left"
};

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941



class LanguagePackDesigner extends Component {
  constructor() {
                      super();
                      this.state={
                        url:false,
                                    open:true,
                                    value:'',
                                    values:[],
                                    creator:'',
                                    name:'',
                                    version:'',
                                    tags:[],
                                    description:'',open_editor:false,
                                    repo_url:''
  }
  this.handleCreate=this.handleCreate.bind(this);
}

handleOpen = () => {
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

handleClick(){
  //alert('klkl')
}

handleChange(propertyname,event) {
  if(propertyname=='creator')
  {

    this.setState({creator:event.target.value});
  }
  else  if(propertyname=='name')
  {

    this.setState({name:event.target.value});
  }
  else  if(propertyname=='desc')
  {

    this.setState({description:event.target.value});
  }
  else  if(propertyname=='version')
  {

    this.setState({version:event.target.value});
  }
  else  if(propertyname=='tags')
  {
    var tagArr = event.target.value.split(",");
    this.setState({tags:tagArr});
  }


 }

// handleSubmit(event) {
//     var target =event.target
//     var name = target.name.value
//     alert(name)
//     var items = this.state.values
//     items.push(name)
//     alert(items)
//     this.setState({values:items})
//     event.preventDefault();
//   }

  handleCreate()
  {


    var that=this;
    axios.post('https://api.github.com/user/repos',{
        "name": this.state.name,
        "description": "This is your first repository",
        "homepage": "https://github.com",
        "private": false,
        "has_issues": true,
        "has_projects": true,
        "has_wiki": true
    }, {
      headers: {'Content-Type':'application/json','Authorization':'Bearer 408f1cfd00e396f3f1bbf56a514bda310be1b58b'}

    })
     .then(function (response) {
      console.log(response.data.ssh_url);
    //  console.log(cookies.access_token);
      that.setState({repo_url:response.data.ssh_url,url:true});

   })
    .catch(function (error) {
      alert("repo already exists");
      console.log(error);
    });


   if(this.state.creator==''|| this.state.tags==''||this.state.version==''||this.state.name==''||this.state.description=='')
   {
     alert("Please enter all the entries");
   }
   else {
         this.setState({open:false})
         this.setState({open_editor:true});
   }



  }



  //////////////////////


          //  Creator:
          //  <input type="text"  value={this.state.creator} onChange={this.handleChange.bind(this,"creator")}/>
          //  </label><br/>
          //  <label>
          //  LanguagePack Name:
          //  <input type="text"  value={this.state.name} onChange={this.handleChange.bind(this,"name")}/>
          //  </label><br/>
          //  <label>
          //  Description:
          //  <input type="text"  value={this.state.description} onChange={this.handleChange.bind(this,"desc")}/>
          //  </label><br/>
          //  <label>
          //  Version:
          //  <input type="text"  value={this.state.version} onChange={this.handleChange.bind(this,"version")} />
          //  </label><br/>
          //  <label>
          //  Tags:
          //  <input type="text"  value={this.state.tags} onChange={this.handleChange.bind(this,"tags")}/>
          //  </label><br/>
    /////////////////////////////



  render() {
    const actions = [
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCreate}
      />,
  <Link to={'/home'}><FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
    />,</Link>

  ];

    return (
    <MuiThemeProvider >{this.state.open_editor&&this.state.url?<LanguagePack name={this.state.name} creator={this.state.creator} description={this.state.description} tags={this.state.tags} version={this.state.version} repo_url={this.state.repo_url}/>:
      <div className="App">

        <Dialog
         title="Create Language Pack"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}>
         <TextField
               defaultValue="Default Value"
               floatingLabelText="Creator Name"
               value={this.state.creator} onChange={this.handleChange.bind(this,"creator")}
             /><br />

         <TextField
               defaultValue="Default Value"
               floatingLabelText="Language Pack Name"
               value={this.state.name} onChange={this.handleChange.bind(this,"name")}
         /><br />

          <TextField
               defaultValue="Default Value"
               floatingLabelText="Description of language pack "
                value={this.state.description} onChange={this.handleChange.bind(this,"desc")}
         /><br />

           <TextField
                 defaultValue="Default Value"
                 floatingLabelText="Version"
                 value={this.state.version} onChange={this.handleChange.bind(this,"version")}
           /><br />

            <TextField
                 defaultValue="Default Value"
                 floatingLabelText="Tags"
                  value={this.state.version} onChange={this.handleChange.bind(this,"version")}
             /><br />

       </Dialog>
      </div>}
    </MuiThemeProvider>
    );
  }
}

export default LanguagePackDesigner;
