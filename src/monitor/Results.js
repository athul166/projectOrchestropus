import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';

class Results extends Component {
  render() {
    return (
      <div>
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.handleClick.bind(this,1)}>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <Container>
          <Tabs style={{'margin':'auto','width':'100%','marginTop':'-15'}}>
              <Tab label="STDOUT" style={{'backgroundColor':'#009688'}}>
                  <div>
                    <p>1:5  error  'x' is assigned a value but never used  no-unused-vars</p>
                    <p>2:5  error  'y' is defined but never used           no-unused-vars</p>
                    <p>:heavy_multiplication_x:  2 problems (2 errors, 0 warnings)</p>
                  </div>
                </Tab>
                <Tab label="STDERR" style={{'backgroundColor':'#009688'}}>
                    <p>
                      cannot find module eslint-plugin-node
                    </p>
               </Tab>
               <Tab label="EXITCODE" style={{'backgroundColor':'#009688'}}>
                  <p>
                  0
                  </p>
               </Tab>
        </Tabs>
      </Container>
    </div>
    );
  }
}

export default Results;
