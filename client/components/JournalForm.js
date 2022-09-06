import React from 'react';
import { connect } from 'react-redux';
import { addJournal }from '../store';

class JournalForm extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            isPrivate: 0
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { isPrivate } = this.state;
        if(isPrivate === '2'){
            this.props.addJournal({...this.state, isPrivate: false}, this.props.auth);
        } else {
            this.props.addJournal({...this.state, isPrivate: true}, this.props.auth);
        }
        this.setState({
            title: '',
            // date: '',
            description: '',
            isPrivate: 0
        })
    };
    render(){
        const { onChange, handleSubmit } = this;
        const { title, description, isPrivate } = this.state;
        console.log(isPrivate)
        return (
            <form onSubmit={ handleSubmit }>
                <input
                    placeholder='Write a Title'
                    type='text'
                    name='title'
                    value={ title }
                    onChange={ onChange }
                    required
                />
                <textarea
                    placeholder='Write a Description'
                    name='description'
                    value={ description }
                    onChange={ onChange }
                    required
                />
                <select value={ isPrivate } name='isPrivate' onChange={ onChange }>
                    <option value={0} disabled>Select Privacy</option>
                    <option value={1}>Private</option>
                    <option value={2}>Public</option>
                </select><button type='submit'>Add Journal</button>
            </form>
        )
    }
};
const mapState = state => {
    return {
        auth: state.auth

    }
};
const mapDispatch = dispatch => {
    return {
        addJournal: (journal, auth) => {
            dispatch(addJournal(journal, auth))
        }
    }
};
export default connect(mapState, mapDispatch)(JournalForm);