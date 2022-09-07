import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JournalForm from './JournalForm';
import Home from './Home';

const Profile = ({ journals, auth }) => {
    return (
        <section>
            <img src={ auth.image || null} />
            <h2>{ auth.firstName } { auth.lastName }</h2>
            <button>Send Message</button>
            {/* <ul>
                {
                    journals.map(journal => {
                        return (
                            <li key={journal.id}>
                                <h3><Link to={`/journals/${journal.id}`}>{journal.title}</Link></h3>
                                <p>{journal.date}</p>
                            </li>
                        )
                    })
                }
            </ul> */}
            <JournalForm />
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
        </section>
    )
};
const mapState = state => {
    const auth = state.auth;
    let journals = state.journals.filter(journal => journal.userId === auth.id);
    console.log(journals)
    journals = journals.sort((a,b)=>Number(b.date) - Number(a.date));
    console.log(journals)
    return {
        journals,
        auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(Profile);