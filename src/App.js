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
import Execute from './Execute';
import Appbutton from '../icons/appbar.png';
import IconButton from 'material-ui/IconButton';


import cookie from 'react-cookie';
import HomePageUpdated from './login';
import ActionLogout from 'material-ui/svg-icons/action/power-settings-new';

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
   this.handleLogout=this.handleLogout.bind(this);
  }
  handleToggle = () => this.setState({open: !this.state.open});

  handleClose(value){
    this.setState({open: false});
    this.setState({pageStatus: value});
}
handleLogout(){
  //console.log('access_token');
  cookie.remove('access_token');

 }





  render() {
    if(cookie.load('access_token')===undefined){
          return(
            <MuiThemeProvider>
            <div>
            <HomePageUpdated/>
            </div>
            </MuiThemeProvider>
            );
        }
else{
    return (
      <MuiThemeProvider>
      <div>
            <AppBar style={{'margin':0}}
              title={"Welcome "+cookie.load("user")}
              iconElementLeft={<IconButton><img src={Appbutton} /></IconButton>}
              onLeftIconButtonTouchTap={this.handleToggle}
            >
            <Link to={'/home'}><RaisedButton label="Home" style={style} /></Link>
            <RaisedButton label="Logout" style={style} onTouchTap={this.handleLogout} href="http://localhost:6007"/>
              </AppBar>

              <Drawer
                docked={false}
                width={250}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
              >
              <Link to={'/home'}><MenuItem onClick={this.handleClose.bind(this,'home')}>Home  </MenuItem></Link>
              <Link to={'/monitor'}><MenuItem onClick={this.handleClose.bind(this,'monitor')}>Monitor</MenuItem></Link>
              <Link to={'/execute'}><MenuItem onClick={this.handleClose.bind(this,'execute')}>Execute</MenuItem></Link>
              <Link to={'/workflows'}><MenuItem onClick={this.handleClose.bind(this,'workflows')}>Add New Workflow</MenuItem></Link>
              <Link to={'/languagepack'}><MenuItem onClick={this.handleClose.bind(this,'language')}>Add New Language</MenuItem></Link>
            </Drawer>
            {this.props.children}
      </div>

      </MuiThemeProvider>
    );
  }
  }
}

export default App;



            // {this.state.pageStatus==='home'? <Home />:null}
            // {this.state.pageStatus==='library'? <SearchLibrary />:null}
            // {this.state.pageStatus==='monitor'? <Monitor />:null}
            // {this.state.pageStatus==='execute'? <Execute />:null}
