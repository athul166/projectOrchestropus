import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import NewComponent from './newComponent.js'


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
    alert("dsfadsf");
    var input=this.state.value;
    var that=this;
      var count=0;
      var chip_arr=this.state.chipContent;
      chip_arr.push(input);

    /////////////////////////////
    console.log(this.state.arr_div);
    this.state.arr_div.map((a,e)=>{
      var tags_arr=a.tags;
      if(chip_arr.length==tags_arr)
      {
      tags_arr.map((t,i)=>{
        // console.log("value of t "+t+"   i "+i+"   and textbox "+that.state.value);

        if(t.toLowerCase()===input.toLowerCase())
        {
          console.log(a);
          var newarr=this.state.new_arr;
          newarr.push(a);
          that.setState({arr_div:newarr});
        //  console.log("Now state is "+that.state.arr_div.tags);
          count++;
        }

    });
  }
  });
    if(count==0)
    {
      alert("Sorry no workflow found");
    }
    else {
      var c=0;
      var arr=that.state.chipContent;
      arr.map((d,m)=>{
        if(d===input)
        {
          c++;
        }
      });
      if(c==0)
      arr.push(input);
      that.setState({chipContent:arr});
    }
    this.setState({value:''});
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
  return (
    <div style={style}>
          <TextField
                hintText="Search here" value={this.state.value}
                floatingLabelText="Floating Label Text"  onChange={this.handleChange.bind(this)}/>
          <RaisedButton label="Go" primary={true} onClick={this.onClickGo.bind(this)} style={{'marginLeft':'5'}}/>
          <div style={{'width':'40%','margin':'auto','display':'-webkit-box'}}>{items}</div>
          <NewComponent pageData={this.state.arr_div} />
    </div>
    );
  }
}

export default SearchLibrary;
