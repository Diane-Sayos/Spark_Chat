import axios from 'axios';
import history from '../history';

const messages = (state = [], action) => {
    if(action.type === 'SET_MESSAGES'){
        return action.messages;
    } else if(action.type === 'ADD_MESSAGE'){
        return [...state, action.message];
    } else if(action.type === 'DELETE_MESSAGE'){
        return state.filter(message => message.id !== action.message.id);
    }
    return state;
};
//get all messages from database
export const fetchMessages = () => {
    return async(dispatch) => {
        const messages = (await axios.get('/api/messages', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        console.log(messages)
        dispatch({type: 'SET_MESSAGES', messages})
    }
};
//add message -- message - [text, receiverId, senderId, date]
export const addMessage = (message) => {
    return async(dispatch) => {
        message = (await axios.post('/api/messages', message, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        console.log(message)
        const action = {type: 'ADD_MESSAGE', message};
        window.socket.send(JSON.stringify(action));
        dispatch(action);
    }
};
//delete specific message
export const deleteMessage = (message) => {
    return async(dispatch) => {
        axios.delete(`/api/messages/${message.id}`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        });
        const action = { type: 'DELETE_MESSAGE', message};
        window.socket.send(JSON.stringify(action));
        dispatch(action)
    }
};
export default messages;