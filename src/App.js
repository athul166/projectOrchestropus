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
import {  Link } from 'react-router';
import Execute from './Execute'

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
            <AppBar
              title="Project"
              onLeftIconButtonTouchTap={this.handleToggle}
              style={{textAlign:'center'}}>
            <Link to={'/home'}><RaisedButton label="Home" style={style} /></Link>

              </AppBar>

              <Drawer
                docked={false}
                width={250}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
              >
              <Link to={'/home'}><MenuItem onClick={this.handleClose.bind(this,'home')}>Home  </MenuItem></Link>
              <Link to={'/library'}><MenuItem onClick={this.handleClose.bind(this,'library')}>Library</MenuItem></Link>
              <Link to={'/monitor'}><MenuItem onClick={this.handleClose.bind(this,'monitor')}>Monitor</MenuItem></Link>
              <Link to={'/execute'}><MenuItem onClick={this.handleClose.bind(this,'execute')}>Execute</MenuItem></Link>
            </Drawer>
            {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;


            // {this.state.pageStatus==='home'? <Home />:null}
            // {this.state.pageStatus==='library'? <SearchLibrary />:null}
            // {this.state.pageStatus==='monitor'? <Monitor />:null}
            // {this.state.pageStatus==='execute'? <Execute />:null}