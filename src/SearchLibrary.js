import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import NewComponent from './newComponent.js';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';


const style = {
  width: '80%',
  margin: 'auto',
  marginTop:'10',
  textAlign: 'center'

};

const chipStyl = {

  chip: {
    margin: 4
    }

};

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
      new_arr:[]
    };
  }
  componentDidMount(){
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:4000/db")
        .then(function(result) {
          //console.log(result.data.Workflows);
          _this.setState({
            arr_div: result.data.Workflows
          });
        })
  }

  componentWillUnmount(){
    this.serverRequest.abort();
  }

  handleRequestDelete(i) {
    var arr=this.state.chipContent;
    arr.splice(i,1);
    this.setState({chipContent:arr});
  }
   handleTouchTap() {
    alert('You clicked the Chip.');
  }

   handleToggle = () => this.setState({open: !this.state.open});

   onClickGo(event)
  {
        var arr1=this.state.arr_div;
        arr1=[];
        var totalcount=0;
        var count=0;
        var input=this.state.value;
        var sub=this.state.chipContent;
        // alert(this.state.chipContent);
        sub.push(input);
        console.log("chipcontent");
        console.log(sub);
        this.state.arr_div.map((a,e)=>{
        // arr1.map((a,e)=>{
        if(input.toLowerCase()===a.Name || input.toLowerCase()===a.description || input.toLowerCase()===a.Creator)
     {
       //alert("jkjioio");
       var n=this.state.new_arr;
       n.push(a);
       this.setState({new_arr:n});
     }
     else {

        var main=a.tags;

         for(var i=0;i<main.length;i++)
          {
            for(var j=0;j<sub.length;j++)
            {
              if (main[i] == sub[j])
               {
                 //   main[i] = -1;
                 console.log(main[i]+"     "+sub[i]);
                  count++;
                  break;
               }
            }
          }
          if (count == sub.length)
          {
            //alert("equialaa");
            var c1=0;
            totalcount++;
          //  alert(this.state.chipContent);
            arr1.push(a);
            console.log("after pushing");
            console.log(arr1);
            this.setState({new_arr:arr1});
            console.log("arra_div");
            console.log(this.state.arr_div);
                //  var c=0;
                //   var arr=this.state.chipContent;
                //   arr.map((d,m)=>{
                //     if(d===input)
                //     {
                //       c++;
                //     }
                //   });
                //   if(c==0)
                //   arr.push(input);
                //   that.setState({chipContent:arr});
       }
       count=0;
}
      this.setState({value:''});
         });
     if(totalcount==0)
     {
       //alert("sorry no workflow found");
     }
     else {
      var c=0;
       var arr=this.state.chipContent;
       arr.map((d,m)=>{
         if(d===input)
         {
           c++;
         }
       });
       if(c==0)
       arr.push(input);
       this.setState({chipContent:arr});
     }
     totalcount=0;

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
    <div style={style}>
    <Container>
      <Row>
          <TextField
                hintText="Search here" value={this.state.value}
                floatingLabelText="Floating Label Text"  onChange={this.handleChange.bind(this)}/>
          <RaisedButton label="Go" primary={true} onClick={this.onClickGo.bind(this)} style={{'marginLeft':'5'}}/>
      </Row>
      <Row>
          <div style={{'position':'absolute','width':'40%','margin-left': '374','display':'-webkit-box'}}>{items}</div>
      </Row>
      <Row  style={{'textAlign':'left'}}>
       <h3>Local Repo</h3>
       <Divider />
          {status2 ? <NewComponent pageData={this.state.arr_div}/> : <NewComponent pageData={this.state.new_arr}/> }
      </Row>
      <Row style={{'textAlign':'left','fontFamily':'Roboto'}}>
       <h3>Online Repo</h3>
       <Divider />
          {status2 ? <NewComponent pageData={this.state.arr_div}/> : <NewComponent pageData={this.state.new_arr}/> }
      </Row>
      <Row style={{'textAlign':'left','fontFamily':'Roboto'}}>
       <h3>Recommended</h3>
       <Divider />
          {status2 ? <NewComponent pageData={this.state.arr_div}/> : <NewComponent pageData={this.state.new_arr}/> }
      </Row>
    </Container>
    </div>
    );
  }
}

export default SearchLibrary;
