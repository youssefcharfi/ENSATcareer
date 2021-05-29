import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateOffre from './components/CreateOffre'
import PrivateRoute from './PrivateRoute'
import Menu from './components/Menu'
import OffreDetails from './components/OffreDetails'
import Offres from './components/Offres'
import UpdateOffre from './components/UpdateOffre'
import login from './components/Login'
import signin from './components/signup'
import forgotpasswordvue from './components/forgotpassword'
import resetPassword from './components/resetpassword'
import PrivateVue from './components/Privatevue'




const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <PrivateRoute path='/' exact component={PrivateVue}/>
                <Route path='/login' exact component={login}/>
                <Route path='/offres/add' exact component={CreateOffre}/>
                <Route path='/signin' exact component={signin}/>
                <Route path='/forgotpassword' exact component={forgotpasswordvue}/>
                <Route path='/passwordreset/:resetToken' exact component={resetPassword}/>
                <Route path="/offres" exact component={Offres}/>
                <Route path="/offres/edit/:id" exact component={UpdateOffre}/>
                <Route path="/offres/:id" exact component={OffreDetails}/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes
