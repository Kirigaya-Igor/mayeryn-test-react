import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {UserList} from './components/UserList/UserList';
import './app.scss'
import {PostsList} from './components/PostsList/PostsList';
import {PostDetails} from "./components/PostDetails/PostDetails";
import {GlobalState} from "./components/GlobalState/GlobalState";
import {EditPost} from "./components/EditPost/EditPost";

function App() {

    return (
        <div>
            <GlobalState>
                <HashRouter>
                    <Header/>
                    <Switch>
                        <Route exact path='/userList'
                               component={UserList}/>
                        <Route exact path='/postsList'
                               component={PostsList}/>
                        <Route exact path='/postDetails'
                               component={PostDetails}/>
                        <Route exact path='/editPost'
                               component={EditPost}/>
                        <Redirect to={"/userList"}/>
                    </Switch>
                </HashRouter>
            </GlobalState>
        </div>
    );
}

export default App;
