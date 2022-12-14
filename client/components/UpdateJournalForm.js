import React from 'react';
import { connect } from 'react-redux';
import { updateJournal }from '../store';

class UpdateJournalForm extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            isPrivate: 0
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }
    componentDidMount(){
        console.log('will mount')
        if(this.props.journal.isPrivate === false){
            this.setState({
                title: this.props.journal.title,
                description: this.props.journal.description,
                isPrivate: 2
            })
        } else {
            this.setState({
                title: this.props.journal.title,
                description: this.props.journal.description,
                isPrivate: 1
            })
        }
        console.log('did mount')
    };
    componentDidUpdate(prevProps){
        if(!prevProps.journal.id && this.props.journal.id){
            if(this.props.journal.isPrivate === false){
                this.setState({
                    title: this.props.journal.title,
                    description: this.props.journal.description,
                    isPrivate: 2
                })
            } else {
                this.setState({
                    title: this.props.journal.title,
                    description: this.props.journal.description,
                    isPrivate: 1
                })
            }
        }
        if(prevProps.journal.id && !this.props.journal.id){
            this.setState({
                title: '',
                description: '',
                isPrivate: 1
            })
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { isPrivate } = this.state;
        if(isPrivate === '2'){
            this.props.updateJournal({...this.state, isPrivate: false}, this.props.auth, this.props.journal.id);
        } else {
            this.props.updateJournal({...this.state, isPrivate: true}, this.props.auth, this.props.journal.id);
        }
    };
    closeForm(){
        document.getElementById("journal-form").style.width = '0';
        document.getElementById("journal-app").style.marginRight = '0';
    };
    render(){
        const { onChange, handleSubmit, closeForm } = this;
        const { title, description, isPrivate } = this.state;
        const { journal, deleteJournal } = this.props;
        return (
            <div id="journal-form">
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
                        rows='10'
                        name='description'
                        value={ description }
                        onChange={ onChange }
                        required
                    />
                    <select value={ isPrivate || 1} name='isPrivate' onChange={ onChange }>
                        <option value={1}>Private</option>
                        <option value={2}>Public</option>
                    </select>
                    <button type='submit'>Update Post</button>
                </form>
                <button className="closebtn" onClick={() => deleteJournal(journal)}>Delete Post</button>
                <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
            </div>
        )
    }
};
const mapState = (state, { match }) => {
    const journal = state.journals.find(journal => journal.id === match?.params.id*1) || {
        title: '',
        decription: '',
        isPrivate: 0
    };
    return {
        auth: state.auth,
        journal
    }
};
const mapDispatch = dispatch => {
    return {
        updateJournal: (journal, auth, id) => {
            dispatch(updateJournal(journal, auth, id))
        },
        deleteJournal: (journal) => {
            dispatch(deleteJournal(journal))
        }
    }
};
export default connect(mapState, mapDispatch)(UpdateJournalForm);