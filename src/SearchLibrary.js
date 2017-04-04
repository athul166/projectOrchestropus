import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import CardComponent from './CardComponent.js';
import CardComponent_online from './CardComponent_online.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
// just some icons for illustration (example only):
import IconButton from 'material-ui/IconButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NewGameIcon from 'material-ui/svg-icons/av/playlist-add';
import NewPageIcon from 'material-ui/svg-icons/action/note-add';
import FontIcon from 'material-ui/FontIcon';
import LanguagePackDesigner from './languagepack_designer.js';
import Workflow from './workflow.js';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Add from '../icons/add.png' ;
import Plus from '../icons/plus.png' ;

const style = {
  width: '80%',
  margin: 'auto',
  marginTop:'10',
  textAlign: 'center',
};

const chipStyl = {

 chip: {
    margin: 4,
    }

};

// const plus_button_style={
//
//   position:'absolute',
//   marginTop:'50%',
//   marginLeft:'50%',
//  };

const iconStyles = {
  marginRight: 24,
};


class SearchLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value:'',
      chipContent:[],
      arr_div:[],
      new_arr:[],
       showComponent: false,
       status:'',
       d3_status:false,
       selectedCard:[],
       arr_div_online:[],
       new_arr_online:[]
    };
  }
  componentDidMount(){
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:6007",)
        .then(function(result) {
          console.log("result is ");
          console.log(result.data);
          _this.setState({
            arr_div: result.data
          });
          console.log("state is "+_this.state.arr_div);
        })


         this.serverRequest =
      axios
        .get("http://35.154.207.12/workflow/get",)
        .then(function(result) {
          console.log("result is ");
        console.log(result.data);
          _this.setState({
            arr_div_online: result.data
          });
console.log("state is "+_this.state.new_arr_online);
        })

    }
 handleRequestDelete(i) {
    var arr=this.state.chipContent;
    arr.splice(i,1);
    this.setState({chipContent:arr});
    if(this.state.chipContent.length==0){
      alert("no searching item");
      this.setState({new_arr:[]});
    }
    else
    {
    this.onClickGo();
     }
    }
    handleTouchTap() {
    //  alert('You clicked the Chip.');
    }

    handleToggle = () => this.setState({open: !this.state.open});


onClickGo(event)
{
//  alert("klkl");
//  console.log(this.state.value);
  var _this = this;
  var t=this.state.chipContent;
  if(this.state.value!='')
  t.push(this.state.value);
  console.log("tttttt");
//  console.log(t);




this.setState({value:''});

var u1="http://localhost:6007/search?search_item=";
var u2="http://35.154.207.12/workflow/search?search_item=";
  for(var i=0;i<t.length;i++)
  {
    u1=u1+t[i]+'&search_item=';
    u2=u2+t[i]+'&search_item=';
    }

   console.log("url is this jksalfjdlksajdlkasjdlasjdlkasjd ",u1.substring(0,u1.length-13));

var url1=u1.substring(0,u1.length-13);
var url2=u2.substring(0,u2.length-13);


//  var url="http://localhost:6007/search?search_item="+t;
  this.serverRequest =
    axios
      .get(url1)
      .then(function(result) {
        console.log("result is ");
       console.log(result.data);
        _this.setState({
          new_arr: result.data
        });
      })
      //console.log("state is "+_this.state.arr_div);


  this.serverRequest =
    axios
      .get(url2)
      .then(function(result) {
        console.log("result is ");
       console.log("online",result.data);
        _this.setState({
         new_arr_online : result.data
        });
  console.log("state is "+_this.state.new_arr_online);
      })








}

_onButtonClick() {
//  alert("lkl");
    this.setState({
      showComponent: true,status:'workflow',d3_status:true
    });
  }
click(input)
{
 var chip=this.state.chipContent;
  // chip.push(this.state.value);
   var input=this.state.value;
   this.setState({new_arr:[]});
   var newarr=this.state.new_arr;
    newarr=[];
      var count=0;
   this.state.arr_div.map((a,e)=>
  {
     if(a.Name.toLowerCase()===input.toLowerCase()||a.description.toLowerCase()===input.toLowerCase())
     {
      // alert("in name      "+a.Name);
       newarr.push(a);
       this.setState({new_arr:newarr});
         this.setState({chipContent:chip});
     }
     else {

       var tags_arr=a.tags;
        for(var i=0;i<tags_arr.length;i++)
        {
          for(var j=0;j<chip.length;j++)
          {
            if (tags_arr[i] == chip[j])
             {
            count++;
          //  alert(count+"     "+chip.length);
            break;

             }
          }
        }

       if(count==chip.length)
        {
      newarr.push(a);
          this.setState({new_arr:newarr});
            this.setState({chipContent:chip});
        }
        else
        {
          for(var i=0;i<chip.length;i++)
          {//alert("choippp  "+  i  +"  "+chip[i]);
            for(var j=0;j<tags_arr.length;j++)
            {//alert("tags    "+j+"    "+tags_arr[i]);
              if(chip[i]===tags_arr[j])
              {
                var m1=0;
                for(var m=0;m<this.state.new_arr.length;m++)
                {
                  if(chip[i]===this.state.new_arr.length[m])
                  {
                    m1++;
                    break;
                  }
                }
                if(m1==0)
                {
                  newarr.push(a);
                  this.setState({new_arr:newarr});
                  this.setState({chipContent:chip});
                }
              }
            }
          }
  }        count=0;
     }

 });
  // var a=this.state.new_arr;
  // a.reverse();
  // this.setState({new_arr:a});
  // console.log("after reverse");
  // console.log(this.state.new_arr);
  this.setState({value:''});

  //alert("klkl");
  //  console.log(this.state.value);
  var _this = this;
  var t=this.state.chipContent;
  t.push(this.state.value);
  //  console.log("tttttt");
  //  console.log(t);

  var u="http://localhost:6007/search?search_item=";
  for(var i=0;i<t.length;i++)
  {
    u=u+t[i]+'&search_item=';
  }

   console.log("url is this jksalfjdlksajdlkasjdlasjdlkasjd ",u.substring(0,u.length-13));

  var url=u.substring(0,u.length-13);

  //  var url="http://localhost:6007/search?search_item="+t;
  this.serverRequest =
    axios
      .get(url)
      .then(function(result) {
        console.log("result is ");
       console.log(result.data);
        _this.setState({
          new_arr: result.data
        });
      })



}

handleEnter(event){
  if(event.charCode == 13){
    this.onClickGo();
  }
}


// getcard(cardValue)
// {

//   console.log(cardValue,"inside getcard");
//     // var card=this.state.selectedCard;
//     // card.push(cardValue);
//     // console.log(cardValue);
//     // this.setState({selectedCard:cardValue});

// }

_onLanguage()
{
  //alert("lkldsfsdfsdfsdfsdfsdfsdfsdfsdfdf");
    this.setState({
      showComponent: true,status:'language'
    });

}



 handleChange(evt)
  {
    this.setState({value:evt.target.value})
  }
  render() {
    const items = this.state.chipContent.map((item,i) =>{
      return(
        <Chip  key={i}
          onRequestDelete={this.handleRequestDelete.bind(this,i)}
          onTouchTap={this.handleTouchTap.bind(this)}
          style={chipStyl}
        >
          {item}
      </Chip>
      );
    })
    console.log(this.state.arr_div);
    var status2=false;
    if(this.state.new_arr.length===0){

      status2=true;
    }
    else {
      status2=false;
    }
  return (

<div>{this.state.showComponent?
    [
      (this.state.status=='workflow'?
     [
        <Workflow  d3_status={this.state.d3_status} width={700} height={630} />
     ]:<LanguagePackDesigner />),

   ]:
    <div style={style}>
    <Container>
      <Row>
          <TextField
                hintText="Search here"
                floatingLabelText="Floating Label Text"  onChange={this.handleChange.bind(this)} value={this.state.value}/>
          <RaisedButton label="Go" primary={true} onClick={this.onClickGo.bind(this)} style={{'marginLeft':'5'}}/>
      </Row>
      <Row>
          <div style={{'position':'absolute','width':'40%','margin-left': '374','display':'-webkit-box'}}>{items}</div>
      </Row>
      <Tabs style={{'marginTop':'40'}}>
          <Tab label="Online Repo">
            <div style={{'marginTop':'10','margin-left': '50','margin-right': '50'}}>
                 {status2 ? <CardComponent_online  pageData={this.state.arr_div_online}/> : <CardComponent_online  pageData={this.state.new_arr_online.reverse()} /> }


            </div>
          </Tab>
          <Tab label="Local Repo" >
            <div style={{'marginTop':'10','margin-left': '50','margin-right': '50'}}>
                {status2 ? <CardComponent  pageData={this.state.arr_div}/> : <CardComponent   pageData={this.state.new_arr.reverse()} /> }
            </div>
          </Tab>


      </Tabs>
      <Row>
        <Col sm={10}>
        </Col>
        <Col md={2} style={{'float':'right'}}>
        <div>
           <SpeedDial
             fabContentOpen={
               <IconButton>
                 <img src={Plus} />
               </IconButton>
             }
             fabContentClose={
               <NavigationClose />
             }
           >

             <SpeedDialItem

               label="ADD WORKFLOW"
               fabContent={  <IconButton> <img src={Add} /> </IconButton>}
               onTouchTap={this._onButtonClick.bind(this)}
             />

             <SpeedDialItem
               label="ADD LANGUAGE PACK"
               fabContent={ <IconButton>  <img src={Add} /> </IconButton>}
                onTouchTap={this._onLanguage.bind(this)}

             />
       </SpeedDial>
       </div>

        </Col>
      </Row>
    </Container>

    </div> }


</div>

    );
  }
}

export default SearchLibrary;
