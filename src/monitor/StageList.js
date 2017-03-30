import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';

class StageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageList : [],
      results : []
    };
  }
  componentDidMount(){
    this.context.socket.on('result', this.handleData.bind(this));
  }
  handleData(results){
    var Results = this.state.results;
    if(Results.length==0){
      Results.push(results);
    }
    else{
      Results.forEach((result,i)=> {
        if(result.stageName==results.stageName){
          Results.splice(i,1);
          // Results.push();
        } else {
          Results.push(results);
        }
      });
    }
    this.setState({
      results:Results
    });

  }

  render() {
    console.log(this.state.results);
    var stages= this.state.results.map((result)=>{
      return(
        <Container>
          <Card style={{'width':'100%','margin':'auto','marginTop':'10'}}
            onClick={this.props.handleClick.bind(this,2,this.props.jobId,result.stageName)}>
            <Row>
                <Col sm={6}>
                  <CardHeader
                    title={result.stageName}
                  />
                </Col>
                <Col sm={4} style={{'marginTop':15}}>
                 {result.stages.status}
                </Col>
                <Col sm={2} style={{'marginTop':15}}>
                  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                      <path d="M0-.25h24v24H0z" fill="none"/>
                  </svg>
                </Col>
            </Row>
          </Card>
       </Container>
      );
    });
    return(
        <div>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
              onClick={this.props.handleClick.bind(this,0)}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            {stages}
        </div>
    );

  }
}
StageList.contextTypes = {
  socket:React.PropTypes.object
};
export default StageList;


// if(this.state.results.jobId==this.props.jobId){
//     var stages = this.state.stageList;
//     if(stages.length!=0) {
//       var flag=0;
//       stages.map((stage) => {
//         if(stage.stageName==this.state.results.stageName){
//           flag=1;
//         }
//       });
//       if(flag==0){
//         stages.push({
//           stageName : this.state.results.stageName ,
//           status : this.state.results.stages.status
//         })
//       }
//     } else {
//       stages.push({
//         stageName : this.state.results.stageName ,
//         status : this.state.results.stages.status
//       })
//     }
//     this.setState({
//       stageList : stages
//     })
// }
