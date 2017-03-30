import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    var stageResult=this.state.results.map((result)=>{
      if(result.stages.status=="Completed" || result.stages.status=="Failed"){
        if(result.stageName==this.props.stageName){
          return(
            <Container>
              <Tabs style={{'margin':'auto','width':'100%','marginTop':'-15'}}>
                  <Tab label="STDOUT" style={{'backgroundColor':'#009688'}}>
                      <div>
                        {result.stages.result.stdout}
                      </div>
                    </Tab>
                    <Tab label="STDERR" style={{'backgroundColor':'#009688'}}>
                        {result.stages.result.stderr}
                   </Tab>
                   <Tab label="EXITCODE" style={{'backgroundColor':'#009688'}}>
                   stage exited with code :{result.stages.result.exitCode}
                   </Tab>
            </Tabs>
          </Container>
          );
        }
      }
    })
    return (
      <div>
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.handleClick.bind(this,1)}>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        {stageResult}
    </div>
    );
  }
}
Results.contextTypes = {
  socket:React.PropTypes.object
};
export default Results;
