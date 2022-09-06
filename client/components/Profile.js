import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const JournalEntries = ({ journals, auth }) => {
    return (
        <section>
            <img src={ auth.image || null} />
            <h2>{ auth.firstName } { auth.lastName }</h2>
            <button>Send Message</button>
            <ul>
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
            </ul>
        </section>
    )
};
const mapState = state => {
    const auth = state.auth;
    const journals = state.journals.filter(journal => journal.userId === auth.id);
    return {
        journals,
        auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(JournalEntries);