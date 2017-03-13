import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';


export default class Cards extends Component {
  render(){
       const style =  {
         'width' : 350,
         'marginTop' : 10
       };
    return(
        <Card style={style}>
          <GridList
              cellHeight={100}>
              <GridTile style={{'width':120,'margin':15}}>
                <img src={"http://placehold.it/100x100"} />
              </GridTile>
              <GridTile style={{'width':180}}>
                <CardTitle title="Card title" subtitle="Card subtitle"/>
              </GridTile>
          </GridList>
          <CardText style={{'marginTop':10}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          </CardText>
      </Card>
    );
  }
}
