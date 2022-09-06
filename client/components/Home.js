import React, { useState } from 'react';
import { connect } from 'react-redux';
import JournalForm from './JournalForm';
import { Link } from 'react-router-dom';
//main feed with everyone's journal set on public?

export const Home = ({username, auth, publicJournals})=> {
  console.log(publicJournals[2])
  return (
    <section>
      <JournalForm />
      <ul>
        {
          publicJournals.map(journal => {
            return (
              <li className='post' key={ journal.id }>
                <div className='post-user'>
                  <img className='avatar' src={journal.user.image || null} width='20' height='20'/>
                  <Link to={`/profile/${journal.user.id}`}>{journal.user.fullName}</Link>
                  <p>{ journal.date }</p>
                </div>
                <div className='post-info'>
                  <Link to={`/journals/${journal.id}`}>{ journal.title }</Link><br />
                  <p>{ journal.description }</p>
                </div>
                <ul className='post-images'>
                  {
                    journal.images.map(image => {
                      return (
                        <li key={image.id}>
                          <img src={image.imageUrl}/>
                        </li>
                      )
                    })
                  }
                </ul>
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
  const publicJournals = state.journals.filter(journal => journal.isPrivate === false) || {};
  return {
    username: state.auth.username,
    auth: state.auth,
    publicJournals
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