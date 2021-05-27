import './App.css';
import {Route} from "react-router-dom";

import Home from "./content/Home/Home";
import MessagesContainer from "./content/Messages/MessagesContainer";
import NavContainer from "./Nav/NavContainer";
import UsersContainer from "./content/Users/UsersContainer";
import ProfileContainer from "./content/Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import LoginContainer from "./authentification/Login/LoginContainer";
import RegisterContainer from "./authentification/Register/RegisterContainer";
import UserNotFoundPage from "./errors/UserNotFoundPage";
import {Redirect, Switch} from "react-router";


const App = (props) => {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <div className="second-wrapper">
                <NavContainer/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/' component={Home}/>

                        <Route exact path='/profile' component={ProfileContainer}/>
                        <Route path='/profile/:userId' component={ProfileContainer}/>

                        <Route exact path='/messages' component={MessagesContainer}/>
                        <Route path='/messages/:recipient' render={() => {
                            return <MessagesContainer {...props}/>
                        }}/>

                        <Route path='/users' component={UsersContainer}/>
                        <Route path='/login' component={LoginContainer}/>
                        <Route path='/register' component={RegisterContainer}/>

                        <Route path="/404" component={UserNotFoundPage}/>
                        <Redirect from='*' to='/404' />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default App;
