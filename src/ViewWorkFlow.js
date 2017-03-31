import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
//import Edit from 'material-ui/svg-icons/image/edit';
//  import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Event from 'material-ui/svg-icons/action/event';
import SearchLibrary from './SearchLibrary.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Container, Row, Col } from 'react-grid-system';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
var moment = require('moment');
import Graph from './Graph';
import Close from '../icons/close.png' ;
import Edit from '../icons/edit.png';
import RaisedButton from 'material-ui/RaisedButton';
var YAML = require('json2yaml');
import {Link} from 'react-router';

const customContentStyle = {
  width:'60%',
  maxWidth: 'none',
};

const style = {
  margin: 12,
};
export default class ViewWorkFlow extends Component {
  constructor(props){
    super(props);
    this.state={
      closeStatus:false,
      open:true,
      nodes: [],
      links: [],
      url:'/workflow/'+this.props.SelectedCard[0],
      ymldata:''
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
   componentDidMount(){

//     let json1=this.props.SelectedCard[0].workflows.stages;
//     console.log("retrieved");
//     console.log(json1);

//     console.log("retrieved after stringify");
//     console.log(JSON.stringify(json1));

//    var result=[];
//  for(var i in json1)
//  {
//   console.log(json1[i]);
//     result.push([i, json1 [i]]);
//  }


// console.log("arrrrrrrrr   ",result.reverse());
// console.log("now converted ",JSON.stringify(result));


// var jsonObj=[];

// for (var i=1;i<result.length;i++) {
//     var tmp_values = [];
//     for (var l=1;l<result[i].length;l++) { 
//         tmp_values.push({label: result[0][l], value: result[i][l]}); //label + value respectively
//     }
//     jsonObj.push({key: result[i][0], values: tmp_values}); //key
// }



// console.log('jsonObj    ',jsonObj)







     let jsonData = this.props.SelectedCard[0].workflows;
     console.log("json data ",jsonData);
     console.log(YAML.stringify(jsonData));
     let nodes = [];
     let links = [];
     if(jsonData instanceof Object) {
       if(jsonData['stages']) {
         const stages = Object.keys(jsonData['stages']);
         stages.map((stageName) => {
           if(jsonData['stages'][stageName] instanceof Object) {
             let tempFlag = false;
             for(let j = 0; j< nodes.length; j++) {
               if(nodes[j]['name'].trim() === stageName.trim()) {
                 tempFlag = true;
               }
             }
             if(!tempFlag) {
               nodes.push({ name: stageName});
             }
             if(jsonData['stages'][stageName]['depends_on']) {
               const targets = jsonData['stages'][stageName]["depends_on"];
               for(let i = 0; i< targets.length; i++ ){
                 if(targets[i]) {
                   let flag = false;
                   let linkFlag = false;
                   let sourceIndex = null;
                   let targetIndex = null;
                   for(let j = 0; j< nodes.length; j++) {
                     // To find the source index
                     if(nodes[j]['name'].trim() === stageName && !sourceIndex) {
                       sourceIndex = j;
                     }
                     // To find the target index
                     if(nodes[j]['name'].trim() === targets[i].trim() && !targetIndex) {
                       targetIndex = j;
                     }

                     if(nodes[j]['name'].trim() === targets[i].trim()) {
                       flag = true;
                     }

                     if(sourceIndex != null && targetIndex!= null && !linkFlag) {
                       linkFlag = true;
                       links.push({ source: sourceIndex, target: targetIndex});
                     }
                   }
                 }
               }
             }
           }
         });
         this.setState({ nodes: nodes, links: links});
       }
     }
   else {
       this.setState({ nodes: [], links: [], statePresent: true});
   }
   
 }
  render(){
        // const { width, height } = this.props;
        const styles = {
          graph: {
          width:'80%',
          height:500,
          bottom: 0,
          position: 'fix',
          border: '1px solid #323232',
          }
        };
        var jsonPayload = this.props.SelectedCard[0];
        console.log('JSONPAYLOAD', JSON.stringify(jsonPayload));
          var tags="";
          var i=0;
          this.props.SelectedCard[0].tags.forEach((tag)=>{
            ++i;
            if(i<this.props.SelectedCard[0].tags.length){
             tags=tags+tag+",";
           }
            else {
             tags=tags+tag;
            }
          });
          i=0;
          var url="/workflow/"+this.props.SelectedCard[0].workflow_name;
          var id=this.props.SelectedCard[0]._id.toString().substring(0,8);
          var date = new Date( parseInt( id, 16 ) * 1000 );
          //console.log(date);
          //console.log(moment(date.toString()).fromNow());
          // console.log(this.props.SelectedCard[0].stages[0].stage);
          // this.createJSON(this.props.SelectedCard[0].stages[0].stage);
          //console.log(this.state.nodes);

          return(
            <Dialog modal={true} open={this.state.open} contentStyle={customContentStyle} autoScrollBodyContent={true}>
            <Container style={{'paddingLeft':'0','paddingRight':'0'}}>
             <Row>
                <Col sm={1} md={1}>
                   <Avatar size={70}>WF</Avatar>
                </Col>
                <Col sm={7} md={10}>
                    <CardTitle title={this.props.SelectedCard[0].workflow_name} subtitle={this.props.SelectedCard[0].creator}
                      style={{'margin-left':'20','padding': '4'}}/>
                </Col>
                <Col sm={1} md={1}>
                  <IconButton onClick={this.handleCloseDialog}>
                    <img src={Close} alt='close'/>
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
              <Col sm={2}>
                <span style={{'float':'right'}}>{this.props.SelectedCard[0].downloads} downloads</span>
              </Col>
            </Row>
            <Row style={{'margin-top':'10'}}>
              <Col sm={12}>
                  <Graph nodes={ this.state.nodes }
                  links={ this.state.links } width={ 700 } height={ 400 } />
              </Col>
            </Row>
            <Row>
              <Col sm={11}>
               <Link to={url} params={{ templateName: "hello" }} ><FloatingActionButton style={{'float':'right'}}>
                  <IconButton onClick={this.handleCloseDialog}>
                    <img src={Edit} alt='edit'/>
                  </IconButton>

                </FloatingActionButton></Link>
              </Col>
            </Row>
            <Divider style={{'width':'100%','marginTop':'20'}}/>
            <Row >
              <Col sm={6}>
                <h4>Version</h4>
                <span>{this.props.SelectedCard[0].workflows.version}</span>
              </Col>
              <Col sm={6}>
                <h4>Created</h4>
                <span>{moment(date.toString()).fromNow()}</span>
              </Col>
            </Row>
            </Container>
            </Dialog>
            );
        }
  }