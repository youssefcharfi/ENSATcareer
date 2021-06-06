import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateOffre from './components/CreateOffre'
import PrivateRoute from './PrivateRoute'
import Menu from './components/Menu'
import OffreDetails from './components/OffreDetails'
import Offres from './components/Offres'
import UpdateOffre from './components/UpdateOffre'
import login from './components/Login'
import signup from './components/signup'
import forgotpasswordvue from './components/forgotpassword'
import resetPassword from './components/resetpassword'
import PrivateVue from './components/Privatevue'
import Footer from './components/Footer'
import PresentationGinf from './components/Presntationginf'




const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <PrivateRoute path='/' exact component={PrivateVue}/>
                <Route path='/login' exact component={login}/>
                <Route path='/offres/add' exact component={CreateOffre}/>
                <Route path='/signin' exact component={signup}/>
                <Route path='/forgotpassword' exact component={forgotpasswordvue}/>
                <Route path='/passwordreset/:resetToken' exact component={resetPassword}/>
                <Route path="/offres" exact component={Offres}/>
                <Route path="/offres/edit/:id" exact component={UpdateOffre}/>
                <Route path="/offres/:id" exact component={OffreDetails}/>
                <Route path="/presentation/ginf" exact component={PresentationGinf}/>


            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default Routes
