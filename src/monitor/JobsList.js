import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import io from 'socket.io-client';

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList : [],
      results : []
    };
  }
  componentDidMount(){
    this.context.socket.on('result', this.handleData.bind(this));
  }
  handleData(results){
    //var results = JSON.parse(data);
    //console.log(results.jobId);
    this.setState({
      results:results
    });
    //console.log(this.state.results);
    var jobs = this.state.jobList;
    if(jobs.length!=0) {
      var flag=0;
      jobs.map((job) => {
        if(job.jobId==results.jobId){
          flag=1;
        }
      });
      if(flag==0){
        jobs.push({
          jobId : results.jobId ,
          jobStatus : this.state.results.stages.status
        })
      }
    } else {
      jobs.push({
        jobId : results.jobId ,
        jobStatus : this.state.results.stages.status
      })
    }
    this.setState({
      jobList : jobs
    })
  }

    render() {
    var jobs = this.state.jobList.map((job)=>{
      return(
        <Container>
          <Card style={{'width':'100%','margin':'auto','marginTop':10}} onClick={this.props.handleClick.bind(this,1,job.jobId,'')}>
            <Row>
                <Col sm={6}>
                  <CardHeader
                    title={job.jobId}
                  />
                </Col>
                <Col sm={4} style={{'marginTop':15}}>
                  started
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
              {jobs}
        </div>
    );
  }
}
JobsList.contextTypes = {
  socket:React.PropTypes.object
};

export default JobsList;
