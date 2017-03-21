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

const style = {
  margin: 12,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pageStatus:true
    };
  }
  handleToggle = () => this.setState({open: !this.state.open});

  handleClose(){
    this.setState({open: false});
    this.setState({pageStatus : !this.state.pageStatus});
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
              <MenuItem onTouchTap={this.handleClose.bind(this)}>Home  </MenuItem>
              <MenuItem onTouchTap={this.handleClose.bind(this)}>Library</MenuItem>
            </Drawer>
        </Paper>
        {this.state.pageStatus ? <Home /> : <SearchLibrary /> }
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
