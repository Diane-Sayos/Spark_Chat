import React, { useState } from 'react';
import { connect } from 'react-redux';
import JournalForm from './JournalForm';
import { Link } from 'react-router-dom';
//main feed with everyone's journal set on public?

export const Home = ({username, auth, publicJournals})=> {
  return (
    <section>
      <JournalForm />
      <ul>
        {
          publicJournals.map(journal => {
            return (
              <li key={ journal.id }>
                <h3><Link to={`/journals/${journal.id}`}>{ journal.title }</Link></h3>
                <p><Link to={`/profile/${journal.user.userId}`}>{ journal.user.fullName }</Link></p>
                <p>{ journal.description }</p>
                <p>{ journal.date } | </p>

              </li>
            )
          })
        }
      </ul>
    </section>
    
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    auth: state.auth,
    publicJournals: state.publicJournals
  }
};
const mapDispatch = dispatch => {
  return {
    
  }
}
export default connect(mapState, mapDispatch)(Home)
// const countryCodes = Object.keys(countries.countries);
// const countryNames = countryCodes.map(code => countries.countries[code]);
// console.log(countryNames)
// console.log(countryCodes)