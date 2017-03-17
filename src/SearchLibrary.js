import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import NewComponent from './newComponent.js';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import CardComponent from './CardComponent.js';




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
        .get("http://localhost:4000/Workflows")
        .then(function(result) {
        console.log(result.data);
          _this.setState({
            arr_div: result.data
          });
console.log("state is "+_this.state.arr_div);
        })

    }

  componentWillUnmount(){
    this.serverRequest.abort();
  }

  handleRequestDelete(i) {
    var arr=this.state.chipContent;
    arr.splice(i,1);
    this.setState({chipContent:arr});
    if(this.state.chipContent.length==0)
  {  alert("no searching item");
  this.setState({new_arr:[]});
}
    else
    this.click();
  }
   handleTouchTap() {
    alert('You clicked the Chip.');
  }

   handleToggle = () => this.setState({open: !this.state.open});

   onClickGo(event)
  {
    var c=0;
    var chip=this.state.chipContent;
      var chip1=this.state.chipContent;
   chip.push(this.state.value);
   var input=this.state.value;
   this.setState({new_arr:[]});
   var newarr=this.state.new_arr;
    newarr=[];
      var count=0;
      var t=0;
this.state.arr_div.map((a,e)=>
{
    var tags_arr=a.tags;
    for(var i=0;i<tags_arr.length;i++)
    {
      if(tags_arr[i]===input.toLowerCase())
      {
        t++;
      }
    }
  });
  if(t==0)
  {
    alert("please enter valid searching item")
  }
  else {

   this.state.arr_div.map((a,e)=>
  {
     if(a.Name.toLowerCase()===input.toLowerCase()||a.description.toLowerCase().includes(input.toLowerCase()))
     {
    //  alert("in name      "+ c);
      c++;

       newarr.push(a);
       this.setState({new_arr:newarr});
       chip1=chip;
       this.setState({chipContent:chip1});
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
         alert("when equal   "+c);
        c++;
          newarr.push(a);
          this.setState({new_arr:newarr});
          chip1=chip;
          this.setState({chipContent:chip1});
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
              //   alert("searchning for or   "+c);
                c++;
                  newarr.push(a);
                  this.setState({new_arr:newarr});
                  chip1=chip;
                  this.setState({chipContent:chip1});
                }
              }
            }
          }
  }

        count=0;
     }


  });

  if(c==0)
  {

    alert("sorry no workflow found");
  }
  c=0;
  this.setState({value:''});
}
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
      //    alert("when equal   "+a.Name);

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
            //      alert("searchning for or   "+a.Name);
                  newarr.push(a);
                  this.setState({new_arr:newarr});
                  this.setState({chipContent:chip});
                }
              }
            }
          }
  }

        count=0;
     }

  });
  // var a=this.state.new_arr;
  // a.reverse();
  // this.setState({new_arr:a});
  // console.log("after reverse");
  // console.log(this.state.new_arr);
  this.setState({value:''});
}

handleEnter(event){
  if(event.charCode == 13){
    this.onClickGo();
  }
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
          {status2 ? <CardComponent pageData={this.state.arr_div}/> : <CardComponent pageData={this.state.new_arr.reverse()}/> }
      </Row>
      <Row style={{'textAlign':'left','fontFamily':'Roboto'}}>
       <h3>Online Repo</h3>
       <Divider />
          {status2 ? <CardComponent pageData={this.state.arr_div}/> : <CardComponent pageData={this.state.new_arr.reverse()}/> }
      </Row>
      <Row style={{'textAlign':'left','fontFamily':'Roboto'}}>
       <h3>Recommended</h3>
       <Divider />
          {status2 ? <CardComponent pageData={this.state.arr_div}/> : <CardComponent pageData={this.state.new_arr.reverse()}/> }
      </Row>
    </Container>
    </div>
    );
  }
}

export default SearchLibrary;
