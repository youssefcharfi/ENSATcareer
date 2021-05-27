import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateOffre from './components/CreateOffre'
import Login from './components/Login'
import Menu from './components/Menu'
import Offres from './components/Offres'
import UpdateOffre from './components/UpdateOffre'

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path='/offres/add' exact component={CreateOffre}/>
                <Route path='/login' exact component={Login}/>
                <Route path="/offres" exact component={Offres}/>
                <Route path="/offres/edit/:id" exact component={UpdateOffre}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
