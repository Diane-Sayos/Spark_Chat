import React from 'react';
import { connect } from 'react-redux';
import { deleteImage } from '../store';
import JournalForm from './JournalForm';
import ImageForm from './ImageForm';

const JournalSpecificView = ({ journal, images, deleteImage, auth }) => {
    return (
        <section className='specific-post'>
            { images ? 
                <div className='container'>
                {
                    images.map(image => {
                        return (
                            <div className='box' key={image.id}>
                                <img src={image.imageUrl}/>
                                {image.userId === auth.id ? 
                                <div>
                                    <button>Share Image</button>
                                    <button onClick={() => deleteImage(image)}>Remove Image</button>
                                </div> : null}
                            </div>
                        )
                    })
                }
                </div>
            :null}
            <h2>{journal.title}</h2>
            {journal.user ? <p>{journal.user.fullName}</p> : null}
            <p>{journal.date}</p>
            <p>{journal.description}</p>
            {
                journal.userId === auth.id ? 
                <div>
                    <JournalForm />
                    <ImageForm />
                </div> : null
            }
        </section>
    )
};
const mapState = (state, {match})=> {
    const journal = state.journals.find(journal => journal.id === match.params.id*1) || {};
    const images = state.images.filter(image => image.journalId === journal.id && image.userId === journal.userId) || [];
    return {
        journal,
        images,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        deleteImage: (image) => {
            dispatch(deleteImage(image))
        }
    }
};
export default connect(mapState, mapDispatch)(JournalSpecificView);

