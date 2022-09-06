import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const JournalEntries = ({ journals, auth }) => {
    return (
        <section>
            { auth.image }
            { auth.firstName }
            { auth.lastName }
            {/* create journal form */}
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
    return {
        journals: state.journals,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(JournalEntries);