import React ,{Component} from 'react';
//import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';


import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style1 = {margin: 15,
                backgroundColor:'#FFF59D '
               };

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import ViewWorkFlow_online from './ViewWorkFlow_online.js';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import axios from 'axios';

const style = {
          styleCard:{
              height: 200,
              width: 280,
              margin: 5,
              display: 'inline-block',
              //whiteSpace: 'nowrap'

           },
           CardText:{
             whiteSpace:'nowrap',
             overflow:'hidden',
             position:'reative',
             display:'block'
           },
           CardText1:{
             marginLeft:5,
             //fontFamily:'Times New Roman',
             fontSize:13
           }
     };


class CardComponent extends Component{

    constructor(props) {
    super(props);

   this.state={
      isEditing:false,
      //over:false,
      SelectedCard:[]
    };
  }
  onClickCardToNext(item){
    console.log(item,"item");
   // this.props.Card(2);
    this.setState({isEditing:true});
    var card=this.state.SelectedCard;
    card.push(item);
    this.setState({SelectedCard:card});
   
   
    //this.props.getcard(item);
  }
  onCloseHandle(){
    this.setState({isEditing:false});
    this.setState({SelectedCard:[]})
  }
    render()
    {
    const status1=this.state.isEditing;
    const linkStyle=null;
    console.log(this.props.pageData);
    const listItems = this.props.pageData.map((item) => {
      var tag="";
      const tags=item.tags.map((a,i)=>{
        if(i<item.tags.length-1)
         return tag+a+',';
        else {
          return tag+a;
        }
       });
       console.log("map function"+tags);
      //var x=item.Name.substring(0,8);
      return(

      <Card style={style.styleCard} onClick={this.onClickCardToNext.bind(this,item)}>
         <Container >
         <Row>
          <Row>
          <Col sm={12} style={{'paddingRight':0}} >
            <CardHeader
             title={item.workflow_name}
             subtitle={item.creator}
             avatar={<Avatar>WF</Avatar>}
           />
         </Col>

        </Row>
      <Row>
       <CardText style={style.CardText1}>
          {item.description}
        </CardText>
      </Row>

     <Row >
     <CardText style={style.CardText1} >
        {tags}
  </CardText>

      </Row>

    </Row>
       </Container>

      </Card>

     );

   });

        return(
              <div>
               {status1 ? <ViewWorkFlow_online SelectedCard={this.state.SelectedCard} changeStatus={this.onCloseHandle.bind(this)}/> : listItems}
              </div>
            );
    }
}
export default CardComponent;
