import React from 'react';
import { connect } from 'react-redux';
import { addJournal, updateJournal }from '../store';

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
        if(this.props.journal.isPrivate === false){
            this.setState({
                title: this.props.journal.title,
                description: this.props.journal.description,
                isPrivate: 2
            })
        } else if(this.props.journal.isPrivate === true){
            this.setState({
                title: this.props.journal.title,
                description: this.props.journal.description,
                isPrivate: 1
            })
        } else {
            this.setState({
                title: this.props.journal.title,
                description: this.props.journal.description,
                isPrivate: 0
            })
        }
    };
    componentDidUpdate(prevProps){
        if(!prevProps.journal.id && this.props.journal.id){
            if(this.props.journal.isPrivate === false){
                this.setState({
                    title: this.props.journal.title,
                    description: this.props.journal.description,
                    isPrivate: 2
                })
            } else if(this.props.journal.isPrivate === true){
                this.setState({
                    title: this.props.journal.title,
                    description: this.props.journal.description,
                    isPrivate: 1
                })
            } else {
                this.setState({
                    title: this.props.journal.title,
                    description: this.props.journal.description,
                    isPrivate: 0
                })
            }
        }
        if(prevProps.journal.id && !this.props.journal.id){
            this.setState({
                title: '',
                description: '',
                isPrivate: 0
            })
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { isPrivate } = this.state;
        if(this.props.journal.id){
            if(isPrivate === '2'){
                this.props.updateJournal({...this.state, isPrivate: false});
            } else {
                this.props.updateJournal({...this.state, isPrivate: true});
            }
        } else {
            if(isPrivate === '2'){
                this.props.addJournal({...this.state, isPrivate: false}, this.props.auth);
            } else {
                this.props.addJournal({...this.state, isPrivate: true}, this.props.auth);
            }
        }
        this.setState({
            title: '',
            description: '',
            isPrivate: 0
        })
    };
    closeForm(){
        document.getElementById("journal-form").style.width = '0';
        document.getElementById("main-app").style.marginRight = '0';
    };
    render(){
        const { onChange, handleSubmit, closeForm } = this;
        const { title, description, isPrivate } = this.state;
        const { journal } = this.props;
        console.log(isPrivate)
        return (
            <div className='sidebar' id="journal-form">
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
                    <select value={ isPrivate || 0} name='isPrivate' onChange={ onChange }>
                        <option value={0} disabled>Select Privacy</option>
                        <option value={1}>Private</option>
                        <option value={2}>Public</option>
                    </select>
                    <button type='submit'>{journal.id? 'Update Post' : 'Add Post'}</button>
                    {journal.id? <button>Delete Post</button> : null}
                    <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
                </form>
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
        addJournal: (journal, auth) => {
            dispatch(addJournal(journal, auth))
        },
        updateJournal: (journal) => {
            dispatch(updateJournal(journal))
        }
    }
};
export default connect(mapState, mapDispatch)(UpdateJournalForm);