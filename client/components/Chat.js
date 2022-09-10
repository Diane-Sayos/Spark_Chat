import React, { useState} from 'react';
import { connect } from 'react-redux';

const Chat = ({auth, user, messages}) => {
    const closeForm = () => {
        document.getElementById("chat-form").style.width = '0';
        document.getElementById("profile-app").style.marginRight = '0';
    };
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <section className='sidebar' id='chat-form'>
        <button className="closebtn" onClick={() => closeForm()}>Close x</button>
            <h2>{user.fullName}</h2>
            <hr />
            <ul>
            {
                messages.map(message => {
                    return (
                        <li key={message.id}>
                            <img src={message.sender.image} className='avatar' width='20' height='20' />
                            {message.sender.fullName}
                            {message.text}
                        </li>
                    )
                })
            }
            </ul>
            <form onSubmit={ handleSubmit }>
                <input
                    placeholder='Write a Title'
                    type='text'
                    name='message'
                    value={ message }
                    onChange={ onChange }
                    required
                />
                <button type='submit'>Send</button>
            </form>
        </section>
    )
};
const mapState = (state, {match}) => {
    const user = state.users.find(user => user.id === match.params.id*1) || {};
    const messages = state.messages.filter(message => message.senderId === state.auth.id && message.receiverId === user.id || message.receiverId === state.auth.id && message.senderId === user.id) || [];
    // const receivedMessages = state.messages.filter(message => ) || [];
    return {
        auth: state.auth,
        user,
        messages,

    }
};
const mapDispatch = dispatch => {
    return {
        addMessage: (message) => {
            dispatch(addMessage(message))
        },
        deleteMessage: (message) => {
            dispatch(deleteMessage(message))
        }
    }
};
export default connect(mapState, mapDispatch)(Chat);