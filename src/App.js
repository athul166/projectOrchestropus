import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Cards from './cards.js';
import SearchLibrary from './SearchLibrary.js'
import Home from './Home.js';
import RaisedButton from 'material-ui/RaisedButton';  
import Monitor from './monitor/Monitor';
import { Router, Route, Link, hashHistory } from 'react-router';

const style = {
  margin: 12,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pageStatus:''
    };
  }
  handleToggle = () => this.setState({open: !this.state.open});

  handleClose(value){
    this.setState({open: false});
    this.setState({pageStatus: value});
}
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Paper>
            <AppBar
              title="Project"
              onLeftIconButtonTouchTap={this.handleToggle}
              style={{textAlign:'center'}}>
            <RaisedButton label="Home" style={style} />
              </AppBar>

              <Drawer
                docked={false}
                width={250}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
              >
              <MenuItem onClick={this.handleClose.bind(this,'')}>Home  </MenuItem>
              <MenuItem onClick={this.handleClose.bind(this,'library')}>Library</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this,'monitor')}>Monitor</MenuItem>
            </Drawer>
        </Paper>
        {this.state.pageStatus===''? <Home />:<p></p>}
        {this.state.pageStatus==='library'? <SearchLibrary />:<p></p>}
        {this.state.pageStatus==='monitor'? <Monitor />:<p></p>}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
