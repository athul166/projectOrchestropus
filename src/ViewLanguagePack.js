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
          return(
            <Dialog modal={true} open={this.state.open} contentStyle={customContentStyle} autoScrollBodyContent={true}>
            <Container style={{'paddingLeft':'0','paddingRight':'0'}}>
             <Row>
                <Col sm={1} md={1}>
                   <Avatar size={70}>LP</Avatar>
                </Col>
                <Col sm={7} md={10}>
                    <CardTitle title={this.props.SelectedCard[0].Name} subtitle={this.props.SelectedCard[0].Creator} style={{'margin-left':'20','padding': '4'}}/>
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
               tags:{this.props.SelectedCard[0].tags}
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
                <span>{this.props.SelectedCard[0].version}</span>
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


  // <IconButton style={{'marginLeft': '850','overflowY':'hidden','marginLeft':'815'}}>
  //   <Close onTouchTap={this.handleCloseDialog}/>
  // </IconButton>
  //       <GridList cellHeight={180} style={styles.gridList}>
  //           <GridTile>
  //             <img src={"http://placehold.it/200"} />
  //           </GridTile>
  //           <GridTile>
  //
  //               {this.props.SelectedCard[0].tags}<br/>
  //               {this.props.SelectedCard[0].downloads}
  //             </CardTitle>
  //           </GridTile>
  //       </GridList>
  //       <CardText style={{'marginTop': '-15px'}}>
  //         {this.props.SelectedCard[0].description}
  //       </CardText>
  //       <div style={{'width': '90%','margin-left':'80'}}>
  //         <img src={"http://placehold.it/700x400"} />
  //         <FloatingActionButton style={{'marginLeft': '625','marginTop': '-77px','marginBottom': '32px','overflowY':'hidden'}}>
  //           <Edit />
  //         </FloatingActionButton>
  //       </div>
  //
  //       <Divider style={{'marginLeft' :'20','marginRight' :'20'}} />
  //       <h3 style={{'marginLeft': '20px','margin-bottom': '-12px'}}> Additional Information</h3>
  //       <GridList cellHeight={100} style={{'marginLeft':20}}>
  //           <GridTile >
  //             <h4>Version</h4>
  //             <span>{this.props.SelectedCard[0].version}</span>
  //           </GridTile>
  //           <GridTile >
  //             <h4>Created On</h4>
  //             <span>{this.props.SelectedCard[0].created_on}</span>
  //           </GridTile>
  //       </GridList>
