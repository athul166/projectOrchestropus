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

const customContentStyle = {
  width: '60%',
  maxWidth: 'none',
  marginBottom:'10'
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
       const style =  {
         'width' : "100%",
         'margin' : 'auto',
       };
       const styles = {
        gridList: {
          width: 500,
          height: 200,
          marginTop:'-50'
        },
      };

          return(
            <Dialog
              modal={true}
              open={this.state.open}
              contentStyle={customContentStyle}
              autoScrollBodyContent={true}
            >
            <IconButton style={{'marginLeft': '850','overflowY':'hidden','marginLeft':'815'}}>
              <Close onTouchTap={this.handleCloseDialog}/>
            </IconButton>
                  <GridList cellHeight={180} style={styles.gridList}>
                      <GridTile>
                        <img src={"http://placehold.it/200"} />
                      </GridTile>
                      <GridTile>
                        <CardTitle title={this.props.SelectedCard[0].Name} subtitle={this.props.SelectedCard[0].Creator}>
                          {this.props.SelectedCard[0].tags}<br/>
                          {this.props.SelectedCard[0].downloads}
                        </CardTitle>
                      </GridTile>
                  </GridList>
                  <CardText style={{'marginTop': '-15px'}}>
                    {this.props.SelectedCard[0].description}
                  </CardText>
                  <div style={{'width':'100%','marginLeft' :'100','marginRight' :'100','marginTop':'10','marginBottom':'10'}}>
                    <img src={"http://placehold.it/700x400"} />
                    <FloatingActionButton style={{'marginLeft': '625','marginTop': '-77px','marginBottom': '32px','overflowY':'hidden'}}>
                      <Edit />
                    </FloatingActionButton>
                  </div>

                  <Divider style={{'marginLeft' :'20','marginRight' :'20'}} />
                  <h3 style={{'marginLeft': '20px','margin-bottom': '-12px'}}> Additional Information</h3>
                  <GridList cellHeight={100} style={{'marginLeft':20}}>
                      <GridTile >
                        <h4>Version</h4>
                        <span>{this.props.SelectedCard[0].version}</span>
                      </GridTile>
                      <GridTile >
                        <h4>Created On</h4>
                        <span>{this.props.SelectedCard[0].created_on}</span>
                      </GridTile>
                  </GridList>
            </Dialog>
            );
        }


  }
