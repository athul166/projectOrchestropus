import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import { browserHistory } from 'react-router';
import App from './App';
import Workflow from './workflow';
import { Router, Route,hashHistory,IndexRoute} from 'react-router';
import LanguagePack from './languagepack';
import Home from './Home';
import Execute from './Execute';
import Monitor from './monitor/Monitor';
//import Routes from './routes';
import SearchLibrary from './SearchLibrary';
import Routes from './routes';
import LanguagePackDesigner from './languagepack_designer';


import cookie from 'react-cookie';
import HomePageUpdated from './login';
import './index.css';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ReactDOM.render(
// <Routes history={browserHistory} />,
//   document.getElementById('root')
// );

function authentication(furtherstate,replace){
 if(cookie.load("access_token")===undefined){

           replace({pathname:'/login'});
        }
}



ReactDOM.render(
<Router history={hashHistory}>
   <Route path="/login" component={HomePageUpdated}  />



     <Route path="/" component={App}>
       	<Route path="/home" component={Home} />
       	<Route path="/execute" component={Execute} />
       	<Route path="/monitor" component={Monitor} />
       	<Route path="/library" component={SearchLibrary} />
        <Route path="/languagepack" component={LanguagePackDesigner} />
       	<Route path="/workflow/:templateName" component={Workflow} />
       	<Route path="/workflows" component={Workflow} />
     </Route>
  </Router>,
   document.getElementById('root')
);
