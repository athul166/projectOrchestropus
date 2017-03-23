import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';

class StageList extends Component {
  render() {
    return(
        <div>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.handleClick.bind(this,0)}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          <Container>
            <Card style={{'width':'100%','margin':'auto','marginTop':'-15'}} onClick={this.props.handleClick.bind(this,2)}>
              <Row>
                  <Col sm={6}>
                    <CardHeader
                      title="gitClone"
                    />
                  </Col>
                  <Col sm={4} style={{'marginTop':15}}>
                   Completed
                  </Col>
                  <Col sm={2} style={{'marginTop':15}}>
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                        <path d="M0-.25h24v24H0z" fill="none"/>
                    </svg>
                  </Col>
              </Row>
            </Card>
            <Card style={{'width':'100%','margin':'auto','marginTop':10}}>
              <Row>
                  <Col sm={6}>
                    <CardHeader
                      title="Build"
                    />
                  </Col>
                  <Col sm={4} style={{'marginTop':15}}>
                    Completed
                  </Col>
                  <Col sm={2} style={{'marginTop':15}}>
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                        <path d="M0-.25h24v24H0z" fill="none"/>
                    </svg>
                  </Col>
              </Row>
            </Card>
            <Card style={{'width':'100%','margin':'auto','marginTop':10}}>
              <Row>
                  <Col sm={6}>
                    <CardHeader
                      title="mocha"
                    />
                  </Col>
                  <Col sm={4} style={{'marginTop':15}}>
                    Scheduled
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
        </div>
    );

  }
}

export default StageList;
