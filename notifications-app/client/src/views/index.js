import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
 } from 'react-router-dom';
 import HomeView from './HomeView';
 import AdminView from './AdminView';

 export default () => (
     <Router>
         <Switch>
             <Route path={'/admin'} component={AdminView} />
             <Route path={'/'} component={HomeView} />
         </Switch>
     </Router>
 );