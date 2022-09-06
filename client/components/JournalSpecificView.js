import React from 'react';
import { connect } from 'react-redux';
import { deleteImage } from '../store';

const JournalSpecificView = ({ journal, images, deleteImage }) => {
    return (
        <section>
            <h2>{journal.name}</h2>
            <p>{journal.date}</p>
            <p>{journal.description}</p>
            <ul>
            {
                images.map(image => {
                    return (
                        <li key={image.id}>
                            <img src={image.imageUrl} width='200' height='200'/>
                            <button>Share Image</button>
                            <button onClick={() => deleteImage(image)}>Remove Image</button>
                        </li>
                    )
                })
            }
            </ul>
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
    const images = state.images.filter(image => image.journalId === journal.id && image.userId === state.auth.id) || [];
    return {
        journal,
        images
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