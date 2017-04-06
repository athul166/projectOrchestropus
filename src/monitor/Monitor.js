import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JobsList from './JobsList'
import Results from './Results';
import StageList from './StageList'
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import io from 'socket.io-client';

class Monitor extends Component {
  getChildContext(){
        return {
            socket:this.state.socket
        };
  }
  constructor(props) {
    super(props);
    this.state = {
      slideIndex : 0,
      socket : io('http://localhost:4070/'),
      jobId : '',
      stageName : ''
    };
  }

  handleChangeBack = (value,jobId,stageName) => {
      this.setState({
        slideIndex: value,
        jobId : jobId,
        stageName : stageName
    });
  };

  handleChange = (value,jobId,stageName) => {
      this.setState({
        slideIndex: value,
        jobId : jobId,
        stageName : stageName
    });
  };
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <JobsList handleClick={this.handleChange.bind(this)} />
            { this.state.jobId!='' && <StageList handleClick={this.handleChange.bind(this)}  handleClickBack={this.handleChangeBack.bind(this)} jobId={this.state.jobId} /> }
            { this.state.stageName!='' &&<Results handleClick={this.handleChange.bind(this)} jobId={this.state.jobId} handleClickBack={this.handleChangeBack.bind(this)} stageName={this.state.stageName}/>}
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
Monitor.childContextTypes = {
   socket: React.PropTypes.object
};
export default Monitor;
