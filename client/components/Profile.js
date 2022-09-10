import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JournalForm from './JournalForm';

const Profile = ({ auth, user, journals }) => {
    const openUpdateProfileForm = () => {
        document.getElementById("profile-app").style.marginRight = '350px';
        document.getElementById("updateProfile-form").style.width = '300px';
    }
    const openUpdateImageForm = () => {
        document.getElementById("profile-app").style.marginRight = '350px';
        document.getElementById("imageProfile-form").style.width = '300px';
    }
    const openChatForm = () => {
        document.getElementById("profile-app").style.marginRight = '350px';
        document.getElementById("chat-form").style.width = '300px';
    }
    return (
        <section id='profile-app'>
            {
                auth.id === user.id ?
                <div id='profile-app'>
                    <img src={ auth.image } width='140' height='140'/>
                    <h2>{ auth.fullName }</h2>
                    <button onClick={() => openUpdateProfileForm()} className='openForm-btn'>&#9776; Edit Profile</button>
                    <button onClick={() => openUpdateImageForm()} className='openForm-btn'>&#9776; Update Avatar</button>
                    <JournalForm />
                    {
                        journals.map(journal => {
                            return (
                                <li className='post' key={ journal.id }>
                                    <div className='post-user'>
                                    <img className='avatar' src={auth.image || null} width='20' height='20'/>
                                    <Link to={`/profile/${auth.id}`}>{auth.fullName}</Link>
                                    <p>{ journal.date }</p>
                                    </div>
                                    <div className='post-info'>
                                    <Link to={`/journals/${journal.id}`}>{ journal.title }</Link><br />
                                    <p>{ journal.description }</p>
                                    </div>
                                    <ul className='post-images'>
                                    {
                                        journal.images.length ? journal.images.map(image => {
                                        return (
                                            <li key={image.id}>
                                            <img src={image.imageUrl} width='100' height='100'/>
                                            </li>
                                        )
                                        }):null
                                    }
                                    </ul>
                                    <button onClick={() => deleteJournal(journal)}>Delete Post</button>
                                </li>
                            )
                        })
                    }
                </div> :
                <div>
                    <img src={ user.image } width='140' height='140'/>
                    <h2>{ user.firstName } { user.lastName }</h2>
                    <button onClick={() => openChatForm()} className='openForm-btn'>&#9776; Send Message</button>
                    {
                        journals.map(journal => {
                            return (
                                <li className='post' key={ journal.id }>
                                    <div className='post-user'>
                                    { journal.user.image ? <img className='avatar' src={journal.user.image || null} width='20' height='20'/> : null}
                                    <Link to={`/profile/${journal.user.id}`}>{journal.user.fullName}</Link>
                                    <p>{ journal.date }</p>
                                    </div>
                                    <div className='post-info'>
                                    <Link to={`/journals/${journal.id}`}>{ journal.title }</Link><br />
                                    <p>{ journal.description }</p>
                                    </div>
                                    <ul className='post-images'>
                                    {
                                        journal.images.length ? journal.images.map(image => {
                                        return (
                                            <li key={image.id}>
                                            <img src={image.imageUrl} width='100' height='100'/>
                                            </li>
                                        )
                                        }):null
                                    }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </div>
            }
        </section>
    )
};
const mapState = (state, {match}) => {
    const user = state.users.find(user => user.id === match.params.id*1) || {};
    const journals = state.journals.filter(journal => journal.userId === user.id) || [];
    return {
        user,
        auth: state.auth,
        journals
    }
};
export default connect(mapState)(Profile);