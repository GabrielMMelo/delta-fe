import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Crud from './screens/Crud/Index';
import Home from './screens/Home/Index';
import Student from './screens/Student/Index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/students" component={Crud}/>
            <Route path="/students/:id" component={Student}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;
