import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close'
import IconButton from 'material-ui/IconButton';
import SearchLibrary from './SearchLibrary.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Container, Row, Col } from 'react-grid-system';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

const customContentStyle = {
  width:'60%',
  maxWidth: 'none',
};

export default class ViewLanguagePack extends Component {
  constructor(){
    super();
    this.state={
      closeStatus:false,
      open:true
    };
  }
  handleClose(){
    this.setState({closeStatus:true});
  }
    handleOpenDialog = () => {
     this.setState({open: true});
   };

   handleCloseDialog = () => {
     this.setState({open: false});
     this.props.changeStatus();
   };
  render(){
          var tags="";
          this.props.SelectedCard[0].tags.forEach((tag)=>{
            tags=tags+tag+","
          })
          return(
            <Dialog modal={true} open={this.state.open} contentStyle={customContentStyle} autoScrollBodyContent={true}>
            <Container style={{'paddingLeft':'0','paddingRight':'0'}}>
             <Row>
                <Col sm={1} md={1}>
                   <Avatar size={70}>WF</Avatar>
                </Col>
                <Col sm={7} md={10}>
                    <CardTitle title={this.props.SelectedCard[0].workflow_name} subtitle={this.props.SelectedCard[0].creator} style={{'margin-left':'20','padding': '4'}}/>
                </Col>
                <Col sm={1} md={1}>
                  <IconButton>
                    <Close onTouchTap={this.handleCloseDialog}/>
                  </IconButton>
                </Col>
             </Row>
             <Row style={{'margin-top':'10'}}>
               <Col sm={12}>
                {this.props.SelectedCard[0].description}
               </Col>
             </Row>
            <Row style={{'margin-top':'10','fontStyle':'italic'}}>
              <Col sm={8} >
               tags:{tags}
              </Col>
              <Col sm={3}>
                <span style={{'float':'right'}}>{this.props.SelectedCard[0].downloads} downloads</span>
              </Col>
            </Row>
            <Row style={{'margin-top':'10'}}>
              <Col>
                <img style={{'width':'100%'}} src={"https://upload.wikimedia.org/wikipedia/commons/7/74/Continuous_Delivery_process_diagram.png"} />
              </Col>
            </Row>
            <Row>
              <Col sm={11}>
                <FloatingActionButton style={{'float':'right'}}>
                  <Edit />
                </FloatingActionButton>
              </Col>
            </Row>
            <Divider style={{'width':'100%','marginTop':'20'}}/>
            <Row >
              <Col sm={6}>
                <h4>Version</h4>
                <span>{this.props.SelectedCard[0].stages[0].version}</span>
              </Col>
              <Col sm={6}>
                <h4>Created</h4>
                <span>{this.props.SelectedCard[0].created_on}</span>
              </Col>
            </Row>
            </Container>
            </Dialog>
            );
        }
  }
