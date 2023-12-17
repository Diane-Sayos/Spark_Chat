import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './components/AuthForm';
import Home from './components/Home';
import {me, fetchJournals, fetchImages, fetchUsers, fetchMessages } from './store'
import Profile from './components/Profile';
import JournalSpecificView from './components/JournalSpecificView';
import JournalForm from './components/JournalForm';
import ImageForm from './components/ImageForm';
import UpdateJournalForm from './components/UpdateJournalForm';
import { Signup } from './components/ProfileForm';
import UpdateProfileForm from './components/UpdateProfileForm';
import ImageProfileForm from './components/ImageProfileForm';
import Chat from './components/Chat';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    const url = window.location.origin.replace('http', 'ws');
    window.socket = new WebSocket(url);
    //server is just a channel that has the ability to send and receive messages in real time
    window.socket.addEventListener('message', (e) => {
      //converting action string into an object same as it would in thunks
      const action = JSON.parse(e.data);
      this.props.dispatchAction(action);
    })
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.loadData();
    }
    if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
      //when user logout, we close the connection on sockets
      
    }
  }
  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        {isLoggedIn ? (
          <div id='view-body'>
            {window.location.pathname === '/' ? <Redirect to='/home' /> : null }
            <Route exact path="/home" component={Home} />
            <Route exact path='/journals' component={JournalForm} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/profile/:id' component={UpdateProfileForm} />
            <Route exact path='/profile/:id' component={ImageProfileForm} />
            <Route exact path='/profile/:id' component={Chat} />
            <Route exact path='/journals/:id' component={JournalSpecificView} />
            <Route exact path='/journals/:id' component={UpdateJournalForm} />
            <Route exact path='/journals/:id' component={ImageForm} />
          </div>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me())
    },
    loadData: () => {
      dispatch(fetchJournals())
      dispatch(fetchImages())
      dispatch(fetchUsers())
      dispatch(fetchMessages())
    },
    dispatchAction: (action) => {
      dispatch(action)
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
