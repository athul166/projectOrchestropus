import React, { Component } from 'react';``
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JobsList from './JobsList'
import Results from './Results';
import StageList from './StageList'
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import io from 'socket.io-client';

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      socket:io('http://localhost:4070/')
    };
  }
  componentDidMount(){
    this.state.socket.on('result',function(msg){
      console.log(msg);
    });
  }
  // handlePrintData(data){
  //   console.log(data);
  // }
  handleChange = (value) => {
      this.setState({
        slideIndex: value,
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
            <JobsList handleClick={this.handleChange.bind(this)}/>
            <StageList handleClick={this.handleChange.bind(this)}/>
            <Results handleClick={this.handleChange.bind(this)}/>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Monitor;
