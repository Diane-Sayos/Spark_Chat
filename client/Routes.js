import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me, fetchJournals, fetchImages, fetchPublicJournals} from './store'
import JournalEntries from './components/JournalEntries';
import JournalForm from './components/JournalForm';
import ImageForm from './components/ImageForm';
import JournalSpecificView from './components/JournalSpecificView';
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
      <div className='main'>
        {isLoggedIn ? (
          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path='/journals' component={JournalEntries} />
            <Route exact path='/journals' component={JournalForm} />
            <Route exact path='/journals/:id' component={JournalSpecificView} />
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
      dispatch(fetchPublicJournals())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
