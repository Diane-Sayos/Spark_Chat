import axios from 'axios'
import history from '../history'

const journals = (state = [], action) => {
  if(action.type === 'SET_JOURNALS'){
    return action.journals;
  } else if( action.type === 'ADD_JOURNAL'){
    return [action.journal, ...state];
  } else if(action.type === 'UPDATE_JOURNAL'){
    return state.map(journal => journal.id === action.journal.id? action.journal : journal);
  } else if(action.type === 'DELETE_JOURNAL'){
    return state.filter(journal => journal.id !== action.journal.id);
  }
  return state;
};
//get all journals
export const fetchJournals = () => {
    return async(dispatch) => {
        const journals = (await axios.get('/api/journals', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'SET_JOURNALS', journals})
    }
};
//add a journal
export const addJournal = (journal, auth) => {
  return async(dispatch) => {
    journal = (await axios.post('/api/journals', {
      userId: auth.id,
      title: journal.title,
      description: journal.description,
      isPrivate: journal.isPrivate,
      date: journal.date
    },
    {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;

    //action is object
    const action = {type: 'ADD_JOURNAL', journal};
    //window has socket and it can send data -- sending action object and converting it into string using json stringify
    window.socket.send(JSON.stringify(action))
    dispatch(action);
    history.push(`/journals/${journal.id}`);
  }
};
//update journal
export const updateJournal = (journal, auth, id) => {
  console.log(journal)
  return async(dispatch) => {
    journal = (await axios.put(`/api/journals/${id}`, {
      title: journal.title,
      description: journal.description,
      isPrivate: journal.isPrivate,
      userId: auth.id
    },{
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    const action = {type: 'UPDATE_JOURNAL', journal};
    window.socket.send(JSON.stringify(action))
    dispatch(action);
  }
};
export default journals;
