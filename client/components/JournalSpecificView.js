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
        <section  className='main'>
            <p className='date'>{journal.date}</p>
            {journal.user ? <p className='author'> by {journal.user.fullName}</p> : null}
            <h2>{journal.title}</h2>

            { images ? 
                <div className='container'>
                {
                    images.map(image => {
                        return (
                            <div className='box' key={image.id}>
                                <img src={image.imageUrl}/>
                                {image.userId === auth.id ? 
                                <div>
                                    <button onClick={() => deleteImage(image)}>Remove Image</button>
                                </div> : null}
                            </div>
                        )
                    })
                }
                </div>
            :null}


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
        },
        addImage: (image, authId, journalId) => {
            dispatch(addImage(image, authId, journalId))
        }
    }
};
export default connect(mapState, mapDispatch)(JournalSpecificView);