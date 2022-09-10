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
        <section id='journal-app'>
            {
                journal.userId === auth.id ?
                <div>
                    <p className='date'>{journal.date}</p>
                    <p className='author'> by {auth.fullName}</p>
                    <h2>{journal.title}</h2>
                    <div className='container'>
                        {
                            images.map(image => {
                                return (
                                    <div className='box' key={image.id}>
                                        <img src={image.imageUrl}/>
                                        <button onClick={() => deleteImage(image)}>Remove Image</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p>{journal.description}</p>
                    <button onClick={() => openPostForm()} className='openForm-btn'>&#9776; Edit Post</button>
                    <button onClick={() => openImageForm()} className='openForm-btn'>&#9776; Add Images</button>
                </div> : 
                <div>
                    <p className='date'>{journal.date}</p>
                    {journal.user ? <p className='author'> by {journal.user.fullName}</p> : null}
                    <h2>{journal.title}</h2> 
                        <div className='container'>
                        {
                            images.map(image => {
                                return (
                                    <div className='box' key={image.id}>
                                        <img src={image.imageUrl} />
                                    </div>
                                )
                            })
                        }
                        </div>
                    <p>{journal.description}</p>
                </div>
            }
        </section>
    )
};
const mapState = (state, {match})=> {
    const journal = state.journals.find(journal => journal.id === match.params.id*1) || {};
    const images = state.images.filter(image => image.journalId === journal.id) || [];
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