import React from 'react';
import { connect } from 'react-redux';
import { deleteImage } from '../store';

const JournalSpecificView = ({ journal, images, deleteImage }) => {
    const user = journal.user;
    console.log(user)
    const allImages = journal.images;
    console.log(images)
    return (
        <section className='specific-post'>
            <div className='container'>
            {
                images.map(image => {
                    return (
                        <div className='box' key={image.id}>
                            <img src={image.imageUrl}/>
                            <div>
                                <button>Share Image</button>
                                <button onClick={() => deleteImage(image)}>Remove Image</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <h2>{journal.title}</h2>
            <p>{journal.date}</p>
            <p>{journal.description}</p>
            {/* Maybe have a dropdown saying if its either private or public post? */}
            <button>Private?</button>
            {/* Edit button that will show the edit form */}
            <button>Edit</button>
            {/* delete button that will delete post and redirect back to feed */}
            <button>Delete Post</button>
        </section>
    )
};
const mapState = (state, {match})=> {
    const journal = state.journals.find(journal => journal.id === match.params.id*1) || {};
    const images = state.images.filter(image => image.journalId === journal.id*1) || [];
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

