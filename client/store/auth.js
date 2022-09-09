import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**sACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (user, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      iamge: user.image
    })
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    history.push('/home');
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}
export const updateUser = (data) => {
  return async(dispatch) => {
    const auth = (await axios.put(`/auth/me`, {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      image: data.image
    },{
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    console.log(auth);
    dispatch({type: SET_AUTH, auth});
  }
}
/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
