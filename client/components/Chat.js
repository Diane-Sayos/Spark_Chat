import React, { useState} from 'react';
import { connect } from 'react-redux';
import { addMessage, deleteMessage } from '../store';

const Chat = ({auth, user, messages, addMessage, deleteMessage}) => {
    const closeForm = () => {
        document.getElementById("chat-form").style.width = '0';
        document.getElementById("profile-app").style.marginRight = '0';
    };
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
        console.log(message)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const messageObj = {receiverId: user.id, senderId: auth.id, text: message, date: new Date()};
        console.log(messageObj)
        addMessage(messageObj);
        setMessage('');
    }
    return (
        <section className='sidebar' id='chat-form'>
            <h2>{user.fullName}</h2>
            <hr />
            <ul>
            {
                messages? messages.map(message => {
                    return (
                        <li key={message.id} className='chat-box'>
                            {
                                message.senderId === auth.id ?
                                <div className='message-sender'>
                                    <img src={message.sender.image} className='avatar' width='20' height='20' />
                                    {message.sender.fullName}< br/>
                                    <p className='chat-date'>{message.date}</p>
                                    <p className='chat'>{message.text}</p>
                                    <button onClick={ () => deleteMessage(message)}>Unsend</button>
                                </div>:
                                <div className='message-receiver'>
                                    <img src={message.sender.image} className='avatar' width='20' height='20' />
                                    {message.sender.fullName}< br/>
                                    <p className='chat-date'>{message.date}</p>
                                    <p className='chat'>{message.text}</p>
                                </div>
                            }
                        </li>
                    )
                }):null
            }
            </ul>
            <form onSubmit={ handleSubmit }>
                <input
                    placeholder='Write a Message'
                    type='text'
                    name='message'
                    value={ message }
                    onChange={ onChange }
                    required
                />
                <button type='submit'>Send</button>
            </form>
            <button className="closebtn" onClick={() => closeForm()}>Close Chat</button>
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