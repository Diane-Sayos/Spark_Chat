import axios from 'axios';

const publicJournals = (state = [], action) => {
    if(action.type === 'SET_PUBLIC_JOURNALS'){
        return action.publicJournals;
    }
    return state;
};

export const fetchPublicJournals = () => {
    return async(dispatch) => {
        const publicJournals = (await axios.get('/api/publicJournals', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        console.log(publicJournals);
        dispatch({type: 'SET_PUBLIC_JOURNALS', publicJournals})
    }
};
export default publicJournals;