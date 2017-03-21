import React, {
               Component
           } from 'react';
        //   import './App.css';
           import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
           import Paper from 'material-ui/Paper';
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
               constructor() {
                   super();
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
                       lang: 'Language pack',
                       languagePackFiles: [],
                       title: '',
                       open_ls: false,
                       openTitle:''
                   }
               }

               updateCode(newCode) {
                   this.setState({
                       code: newCode,
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
                       title: event.target.value
                   });
               }
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
                 console.log(title);
                   this.setState({
                       open_ls: true,
                       openTitle : title
                   })
               }

               handleCheck() {
                   var data = this.state.code

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
                                       this.handleCheck.bind(this)
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
                               } </List> </Drawer> {
                                   this.state.open_ls ? ( < div > < Paper style = {
                                           {
                                               'width': '85%',
                                               'float': 'right'
                                           }
                                       } >
                                       <CodeMirror value = {
                                           this.state.openTitle+' '+this.state.code
                                       }
                                       onChange = {
                                           this.updateCode.bind(this)
                                       }
                                       options = {options}
                                       /> </Paper > < /div > ) : (console.log())
                                   }

                                   </Paper>

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
