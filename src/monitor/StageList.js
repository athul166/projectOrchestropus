import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
class StageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageList : []
    };
  }
  componentWillMount(){
    //console.log("props"+this.props.jobId);
    var url="http://localhost:6007/stages?jobId="+this.props.jobId;
    this.serverRequest =
      axios
        .get(url)
        .then((result) => {
          //console.log(result.data);
          this.setState({
            stageList: result.data
          });
        });
        //console.log(this.state.stageList);
    this.context.socket.on('result', function(results){
      //console.log(results);
      for(var key in this.state.stageList){
        var stages = this.state.stageList;
        if(key==results.stageName){
          stages[key]=JSON.stringify(results.stages);
        }
      }
      this.setState({
        stageList : stages
      })
    }.bind(this));
  }

  render() {
    console.log('this.state.stageList',this.state.stageList);
    // console.log(this.state.results);
    var arr=[];
    var status;
    for(var key in this.state.stageList){
      const value = this.state.stageList[key];
      console.log(JSON.parse(value).status);
      var color;
        if(JSON.parse(value).status=="Completed")
        {
          color= "#1B5E20 "
        }
        else if(JSON.parse(value).status=="Failed")
        {
          color="#d50000 "
        }
        else
        {
          color="#FFFF00 "
        }
       arr.push(
        <Container>
          <Card style={{'width':'100%','margin':'auto','marginTop':'10'}}
            onClick={this.props.handleClick.bind(this,2,this.props.jobId,key)}>
            <Row>
                <Col sm={6}>
                  <CardHeader
                    title={key}
                  />
                </Col>
                <Col sm={4} style={{'marginTop':15}}>
                <Avatar
                    backgroundColor={color}
                    size={25}
                  />
                </Col>
                <Col sm={2} style={{'marginTop':15}}>
                  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                      <path d="M0-.25h24v24H0z" fill="none"/>
                  </svg>
                </Col>
            </Row>
          </Card>
       </Container>);
  }
    return(
        <div>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
              onClick={this.props.handleClickBack.bind(this,0,'','')}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            {arr}
        </div>
    );

  }
}
StageList.contextTypes = {
  socket:React.PropTypes.object
};
export default StageList;
