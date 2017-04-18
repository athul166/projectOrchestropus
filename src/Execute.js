import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import {  Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const style = {
  height: 400,
  width: 700,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


export default class Execute extends Component {
  constructor(){
    super();
    this.state={
      url:'',
      itemvalue: '',
      template : '',
      templateName:'',
      arr_div:[],
      new_arr:[],
      workflows_body:'',
      value: ''


    }
  }

  componentDidMount(){
    this.serverRequest =
    axios
    .get("/all",)
    .then(function(result) {
      console.log("result is ");
      console.log(result.data);
      _this.setState({
        arr_div: result.data
      });

        })
        var _this = this;

  }

        handleChangeUrl(evt)
        {
         this.setState({url:evt.target.value});
         console.log(this.state.url);
       }
       handleChangeTemplate(evt)
       {
        this.setState({templateName:evt.target.value});
        console.log(this.state.templateName);
      }
      handleRequest(a){
      //  alert("asfasf");
    console.log(a,"  a")
        axios.post('http://localhost:4070/api/v1/jobs',{
          payload : {
            repoUrl : this.state.url
          },
          template: a,
          templateName:this.state.itemvalue
        })
        .then(function(response){
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });

      }

      onClickGo()
      {
      //  alert("awidhoiewje");
        var _this = this;
        var it=_this.state.itemvalue;
        console.log("this is it "+it);
        var url="http://localhost:6007/search?search_item="+it;
        this.serverRequest =
        axios
        .get(url)
        .then(function(result) {
          //console.log("result is ");
          //console.log(result.data);
          _this.setState({
            new_arr: result.data
          });
          //console.log(_this.state.new_arr);
          //console.log("state is "+_this.state.new_arr[0].workflow_name);
           _this.setState({workflows_body:_this.state.new_arr[0].workflows});
            console.log(_this.state.workflows_body,"ioioioioioioi");
        _this.handleRequest(_this.state.workflows_body);


        })





      }

      handleChange(event,value){
        var itemvalue1=event.target.innerHTML;
        console.log(event.target.innerHTML);
        this.setState({value});
        this.setState({itemvalue: itemvalue1});
        console.log("itemvalue is "+this.state.itemvalue);

      }

      render(){
         console.log("workflows boy only  "+this.state.workflows_body);
        const items = this.state.arr_div.map((item,i) =>{
          return(
            <MenuItem value={i} key={i} primaryText={item.workflow_name} />
            );
          });


          return(
          <Container>
           <Paper style={style} zDepth={2} >
           <h2>Execute Workflow</h2>
           <Divider />
          <Row>
          <TextField
          floatingLabelText="Enter Your Git Url here"
          onChange={this.handleChangeUrl.bind(this)}/>
          </Row>

          <Row>
         Choose Workflow    <DropDownMenu maxHeight={300} value={this.state.value}  onChange={this.handleChange.bind(this)}>
          {items}
          </DropDownMenu>
          <RaisedButton label="Go" primary={true} style={{'marginLeft':'5'}} onClick={this.onClickGo.bind(this)}/>
          </Row>
          </Paper>
          </Container>
          );
        }

      }
