import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class Execute extends Component {
  constructor(){
    super();
    this.state={
      url:'',
      template : '',
      templateName:''

    }
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
    handleRequest(){
      axios.post('http://localhost:4070/api/v1/jobs',{
        payload : {
          repoUrl : this.state.url
        },
        template: null,
        templateName: this.state.templateName
      })
      .then(function(response){
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    render(){
      return(
        <Container>
          <Row>
              <TextField
                    floatingLabelText="Git Url"
                    onChange={this.handleChangeUrl.bind(this)}/>
          </Row>
          <Row>
              <TextField
                    floatingLabelText="Template Name"
                    onChange={this.handleChangeTemplate.bind(this)}/>
              <RaisedButton label="Go" primary={true} style={{'marginLeft':'5'}} onClick={this.handleRequest.bind(this)}/>
          </Row>
        </Container>
      );
    }

}
