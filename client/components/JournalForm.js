import React from 'react';
import { connect } from 'react-redux';
import { addJournal }from '../store';

class JournalForm extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            isPrivate: 1
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
            
            this.props.addJournal({...this.state, isPrivate: false, date: new Date()}, this.props.auth);
        } else {
            this.props.addJournal({...this.state, isPrivate: true, date: new Date()}, this.props.auth);
        }
        this.setState({
            title: '',
            description: '',
            isPrivate: 1
        })
    };
    render(){
        const { onChange, handleSubmit } = this;
        const { title, description, isPrivate } = this.state;
        console.log(isPrivate)
        return (
            <div>
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
                        type='text'
                        cols='30'
                        rows='7'
                        name='description'
                        value={ description }
                        onChange={ onChange }
                        required
                    />
                    <select value={ isPrivate || 1} name='isPrivate' onChange={ onChange }>
                        <option value={1}>Private</option>
                        <option value={2}>Public</option>
                    </select>
                    <button type='submit'>Add Post</button>
                </form>
            </div>
        )
    }
};
const mapState = (state) => {
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