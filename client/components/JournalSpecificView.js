import React from 'react';
import { connect } from 'react-redux';
import { deleteImage, addImage } from '../store';

const JournalSpecificView = ({ journal, images, deleteImage, auth }) => {
    const openPostForm = () => {
        document.getElementById("journal-app").style.marginRight = '350px';
        document.getElementById("journal-form").style.width = '300px';
    }
    const openImageForm = () => {
        document.getElementById("journal-app").style.marginRight = '350px';
        document.getElementById("image-form").style.width = '300px';
    }
    return (
        <section  className='main' id='journal-app'>
            <p className='date'>{journal.date}</p>
            {journal.user ? <p className='author'> by {journal.user.fullName}</p> : null}
            <h2>{journal.title}</h2>

            { journal.images ? 
                <div className='container'>
                {
                    journal.images.map(image => {
                        return (
                            <div className='box' key={image.id}>
                                <img src={image.imageUrl}/>
                                {image.userId === auth.id ? 
                                <button onClick={() => deleteImage(image)}>Remove Image</button> : null}
                            </div>
                        )
                    })
                }
                </div>:null
                }
            <p>{journal.description}</p>
            {
                journal.userId === auth.id ? 
                <div className='form-btn'>
                    <button onClick={() => openPostForm()} className='openForm-btn'>&#9776; Edit Post</button>
                    <button onClick={() => openImageForm()} className='openForm-btn'>&#9776; Add Images</button>
                </div> : null
            }
        </section>
    )
};
const mapState = (state, {match})=> {
    const journal = state.journals.find(journal => journal.id === match.params.id*1) || {};
    return {
        journal,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        deleteImage: (image) => {
            dispatch(deleteImage(image))
        },
        addImage: (image, authId, journalId) => {
            dispatch(addImage(image, authId, journalId))
        }
    }
};
export default connect(mapState, mapDispatch)(JournalSpecificView);