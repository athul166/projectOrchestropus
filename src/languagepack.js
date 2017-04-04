import React, {
               Component
           } from 'react';
        //   import './App.css';
           import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
           import Paper from 'material-ui/Paper';
           import RaisedButton from 'material-ui/RaisedButton';
           import Drawer from 'material-ui/Drawer';
           import {
               List,
               ListItem
           } from 'material-ui/List';
           import Subheader from 'material-ui/Subheader';
           import CodeMirror from 'react-codemirror';
           import TextField from 'material-ui/TextField';
           import 'codemirror/lib/codemirror.css';
           import Chip from 'material-ui/Chip';
           import FlatButton from 'material-ui/FlatButton';
           import Dialog from 'material-ui/Dialog';
          import axios from 'axios';
          import {  Link } from 'react-router';


           import {
               Container,
               Row,
               Col,
               Visible,
               Hidden,
               ScreenClassRender
           } from 'react-grid-system';
           import {
               MorphIcon,
               CloseButton,
               NavButton,
               PlusButton,
           } from 'react-svg-buttons';

           const styleInput = {
               borderWidth: 0,
               width: 100
           };
           const style = {
             margin: 12,
           };

           const styl = {
               chip: {
                   margin: 0,
               },
               wrapper: {
                   display: 'flex',
                   flexWrap: 'wrap',
               },
           };


           class LanguagePack extends Component {
               constructor(props) {
                   super(props);
                   this.state = {
                       code: '//code ',
                       open: false,
                       open_language: false,
                       dialogOpen: true,
                       clone: 'clone',
                       build: 'build',
                       mocha: 'mocha',
                       istan: 'istanbul',
                       eslint: 'eslint',
                       lang: this.props.name,
                       languagePackFiles: [],
                       title: '',
                       open_ls: false,
                       openTitle:'',
                       list:[],
                       open_save:false

                   }
this.handleOk=this.handleOk.bind(this);
                   console.log(this.props.name);
                   console.log(this.state.lang);
               }

               updateCode(newCode) {
                   this.setState({
                       code:newCode,
                   });
               }





               handleOpen = () => {
                   this.setState({
                       open: true
                   });
               };

               handleClose = () => {

                   this.setState({
                       open: false
                   })
               };
               handleNewClick() {
                   this.setState({
                       dialogOpen: true
                   });
               }

               // handleLanguage()
               //  {
               //
               //    this.setState({open_language:true});
               //  }



               handleInputChange(chan) {

                   var filename = chan.target.value;
                   this.setState({
                       title: filename
                   })

               }




               handleChange(event) {
                   var name = event.target.name;
                   this.setState({
                       [name]: event.target.value,
                       title: event.target.value,
                       lang:event.target.value
                   });
               }

               handleSaveLp()
               {

                  if(this.state.languagePackFiles.length==0)
                 alert("Nothing to save");
                 else {
                   var that=this;
                    axios.post('http://localhost:6007/languagepack/add',{
                        creatorName: that.props.creator,
                          tags:that.props.tags,
                          description:that.props.description,
                          version:that.props.version,
                          languagepackName:that.props.name,
                          list:that.state.list,
                          repo_url:that.props.repo_url,

                    })
                    .then(function (response) {
                      

                   })
                    .catch(function (error) {
                      console.log(error);
                    });
                 }
                  this.setState({open_save:true});
               }



               ////////////////////////////////////////////////


          // createLangPack(creator, lpname, meta) {
              //      var filedata = JSON.stringify(meta);
              //      spawn.spawn
               //
              //     try {
              //          var ls = spawn('mkdir', [creator, creator + '/' + lpname])
              //          spawn('git', ['init', creator + '/' + lpname])
               //
               //
               //
              //         ls.on('close', code => {
              //              console.log(`child process exited with code ${code}`);
              //              var url = './' + creator + '/' + lpname + '/' + lpname + '.txt';
              //              var fileWriter = fs.createWriteStream(url, 'utf8');
              //              fileWriter.write(filedata);
              //          });
              //      } catch (ex) {
              //          console.log('Error')
              //      }
              //  }
















               ////////////////////////////////////////////////
               handleSubmit() {
                   var title = this.state.title
                   var newtodos = this.state.languagePackFiles;
                   newtodos.push({
                       title
                   })
                   this.setState({
                       title: '',
                       languagePackFiles: newtodos,
                       open: false
                   })
                   console.log(this.state.languagePackFiles);
               }

               handleListClick(title) {


                 this.setState({ open_ls: true});
                 var list1=this.state.list;
                 var n1;
                 var c1;
                 list1.map((a,e)=>
                 {
                   if(a.item===title)
                   {
                    n1=a.item;
                    c1=a.code;

                   }
                 })
                 if(n1!=''&&c1!='')
                 {
                   this.setState({code:c1});
                 }
                 else {
                        console.log(title);
                 var o=this.state.openTitle+this.state.code;
                   this.setState({

                      code:o
                   });
                 }
               }

               handleCheck(title) {
                   var data = this.state.code;
                   if(data=='' || data==="//code")
                   {
                     alert("Please enter the code");
                   }
                   else {

                   if(data.startsWith("//code"))
                  {
                      data= data.substring(6,data.length);

                  }
                  alert(data);
                   var obj1={};
                   obj1.item=title;
                   obj1.code=data;
                   var list1=this.state.list;
                   var c=0;
                   list1.map((a,e)=>
                  {
                   if(a.item===title)
                   {
                       a.code=data;
                       c++;
                   }
                  })
                  this.setState({list:list1});
                  if(c==0)
                  {
                   list1.push(obj1);
                 }
                   this.setState({list:list1});
                   console.log(this.state.list);
                   this.setState({code:"//code"});


               }
             }
             handleOk()
             {

             }

               handleCross(i) {
                   var newtodos = this.state.languagePackFiles;
                   newtodos.splice(i, 1)
                   this.setState({
                       languagePackFiles: newtodos,
                       open_ls: false
                   })
                   alert('deleted')
               }

               render() {
                       var options = {
                           lineNumbers: true,
                       }

                       var arrList = this.state.languagePackFiles
                       var listItems = arrList.map((a, i) => {
                               return ( < Container >
                                   <Row>
                                   <Col md = {8}>
                                   <ListItem key = {i}
                                   primaryText = {
                                       a.title
                                   }
                                   onClick = {
                                     () =>  this.handleListClick(a.title)
                                   } >
                                   </ListItem> </Col>
                                   <Col md = {2}>
                                   <MorphIcon type = "check"
                                   size = {27}
                                   color = '#6edd9f'
                                   style = {
                                       {
                                           'float': 'right',
                                           'padding': 5
                                       }
                                   }
                                   onClick = {
                                       this.handleCheck.bind(this,a.title)
                                   }
                                   /> </Col>
                                   <Col md = {2}
                                   style = {
                                       {
                                           'paddingLeft': '5px'
                                       }
                                   } > < MorphIcon type = "cross"
                                   size = {27}
                                   color = '#dd6e6e'
                                   style = {
                                       {
                                           'float': 'right',
                                           'padding': 5
                                       }
                                   }
                                   onClick = {
                                       this.handleCross.bind(this, i)
                                   }
                                   /> </Col> </Row>

                                   </Container>)
                               })

                           const actions = [ <FlatButton
                               label = "Cancel"
                               primary = {true}
                               onClick = {
                                   this.handleClose.bind(this)
                               }
                               />, <FlatButton
                               label = "Submit"
                               primary = {true}
                               keyboardFocused = {true}
                               onClick = {
                                   this.handleSubmit.bind(this)
                               }
                               />,
                           ];

                           const actions_save = [ <Link to={'/languagepack'}><FlatButton
                               label = "Ok"
                               primary = {true}
                               onClick = {
                                   this.handleClose.bind(this)
                               }
                               />,</Link>
                           ];

                           return ( < MuiThemeProvider >
                               <div>
                               <Paper>
                               <Drawer width = {180}>
                               <Subheader> < input type = 'text'
                               name = 'lang'
                               value = {
                                   this.state.lang
                               }
                               onChange = {
                                   this.handleChange.bind(this)
                               }
                               style = {
                                   styleInput
                               }
                               /> <PlusButton size={35} color='#6edd9f' onClick={this.handleOpen.bind(this)}/ > < /Subheader> <List> {
                                   listItems
                               } </List>

                                <RaisedButton label="Save"  onClick={this.handleSaveLp.bind(this)} primary={true} style={style} />

                                </Drawer> {
                                   this.state.open_ls ? ( < div > < Paper style = {
                                           {
                                               'width': '85%',
                                               'float': 'right'
                                           }
                                       } >
                                       <CodeMirror
                                       value = {
                                           this.state.code
                                       }
                                       onChange = {
                                           this.updateCode.bind(this)
                                       }
                                       options = {options}
                                       /> </Paper > < /div > ) : (console.log())
                                   }

                                   </Paper>

                                    <Dialog title = "Language Pack Saved Successfully"
                                   actions = {actions_save}
                                   modal = {false}
                                   open = {this.state.open_save}
                                   onRequestClose = {
                                       this.handleOk.bind(this)
                                   } >
                                    </Dialog>







                                   <Dialog title = "FileName"
                                   actions = {actions}
                                   modal = {false}
                                   open = {this.state.open}
                                   onRequestClose = {
                                       this.handleClose.bind(this)
                                   } >
                                   < TextField value = {this.state.title}
                                   onChange = {this.handleInputChange.bind(this)}
                                   /> </Dialog>
                                   </div>

                                   < /MuiThemeProvider >
                               );
                           }
                       }

                       export default LanguagePack;
