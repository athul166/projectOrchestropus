import React ,{Component} from 'react';
//import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import ViewLanguagePack from './ViewLanguagePack.js';
import axios from 'axios';

const style = {
              styleCard:{
                  height: 200,
                  width: 300,
                  margin: 15,
                  marginLeft: 20,
                  display: 'inline-block',
                  textAlign:'left',
                }
     };


class NewComponent extends Component{

	constructor(props) {
    super(props);

    this.state={
      isEditing:false,
      over:false,
      SelectedCard:[]
    };
  }
  onClickCardToNext(item){
    this.setState({isEditing:true});
    var card=this.state.SelectedCard;
    card.push(item);
    this.setState({SelectedCard:card});
  }
  onCloseHandle(){
    this.setState({isEditing:false});
    this.setState({SelectedCard:[]})
  }
	render()
	{

    console.log(this.props.pageData);
    const objArray=this.props.pageData;
    //console.log(objArray);
    const status1=this.state.isEditing;
    const linkStyle=null;
    const listItems = this.props.pageData.map((item) => {
        return(

      <Card style={style.styleCard} onClick={this.onClickCardToNext.bind(this,item)}>
          <GridList
            cellHeight={100}>
              <GridTile style={{'width':120,'margin':15}}>
              <img src={"http://placehold.it/100x150"} />
              </GridTile>
              <GridTile style={{'width':180}}>
                <CardTitle
                 title={item.Name}
                  subtitle={item.Creator}
                />
              </GridTile>
          </GridList>
          <CardText style={{'margin-top':10}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa.
          </CardText>
      </Card>

      );

    });

		return(
                <div style={{'margin':'auto','marginTop':'8','marginLeft':'50'}}>
                 {status1 ? <ViewLanguagePack SelectedCard={this.state.SelectedCard} changeStatus={this.onCloseHandle.bind(this)}/> : listItems}
                </div>
			);
	}
}
export default NewComponent;
