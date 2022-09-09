import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
/**
 * COMPONENT
 */
const ProfileForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const user = {
        username: evt.target.username.value,
        password: evt.target.password.value,
        firstName: evt.target.firstName.value,
        lastName: evt.target.firstName.value
      }
      const formName = evt.target.name
      dispatch(authenticate(user, formName))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(ProfileForm)

  