import axios from 'axios';

const images = (state = [], action) => {
    if(action.type === 'SET_IMAGES'){
        return action.images;
    } else if(action.type === 'ADD_IMAGE'){
        return [...state, action.image];
    } else if(action.type === 'DELETE_IMAGE'){
        return state.filter(image => image.id !== action.image.id);
    }
    return state;
};
//get all images
export const fetchImages = () => {
    return async(dispatch) => {
        const images = (await axios.get('/api/images', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'SET_IMAGES', images});
    }
};
//create an image
export const addImage = (image, authId, journalId) => {
    return async(dispatch) => {
        image = (await axios.post('/api/images', {
            imageUrl: image,
            userId: authId,
            journalId: journalId
        }, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        const action = {type: 'ADD_IMAGE', image};
        window.socket.send(JSON.stringify(action))
        dispatch(action);
    }
};
//delete an image
export const deleteImage = (image) => {
    return async(dispatch) => {
        await axios.delete(`/api/images/${image.id}`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        });
        const action = {type: 'DELETE_IMAGE', image};
        window.socket.send(JSON.stringify(action))
        dispatch(action);
    }
};
export default images;