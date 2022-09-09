import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/AuthForm';
import Home from './components/Home';
import {me, fetchJournals, fetchImages, fetchUsers } from './store'
import Profile from './components/Profile';
import JournalSpecificView from './components/JournalSpecificView';
import JournalForm from './components/JournalForm';
import ImageForm from './components/ImageForm';
import UpdateJournalForm from './components/UpdateJournalForm';
import { Signup } from './components/ProfileForm';
import UpdateProfileForm from './components/UpdateProfileForm';
import ImageProfileForm from './components/ImageProfileForm';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.loadData();
    }
  }
  render() {
    const {isLoggedIn} = this.props

    return (
      <div id='main-app'>
        {isLoggedIn ? (
          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/profile/:id' component={UpdateProfileForm} />
            <Route exact path='/profile/:id' component={ImageProfileForm} />
            <Route exact path='/journals' component={JournalForm} />
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

/**
 * CONTAINER
 */
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
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
