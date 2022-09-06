import axios from 'axios'
import history from '../history'

const journals = (state = [], action) => {
  if(action.type === 'SET_JOURNALS'){
    return action.journals;
  } else if( action.type === 'ADD_JOURNAL'){
    return [...state, action.journal];
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
        console.log(journals)
        dispatch({type: 'SET_JOURNALS', journals})
    }
};
//add a journal
export const addJournal = (journal, auth) => {
  return async(dispatch) => {
    journal = (await axios.post('/api/journals', {
      userId: auth.id,
      name: journal.name,
      description: journal.description,
      date: journal.date,
      isPrivate: journal.isPrivate
    },{
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    console.log({...journal, date: journal.date.toLocaleString()})
    dispatch({type: 'ADD_JOURNAL', journal});
    history.push(`/journals/${journal.id}`);
  }
}
export default journals;
