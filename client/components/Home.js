import React from 'react';
import { connect } from 'react-redux';
import JournalForm from './JournalForm';
import { Link } from 'react-router-dom';

export const Home = ({publicJournals})=> {
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
    publicJournals
  }
};
export default connect(mapState)(Home)