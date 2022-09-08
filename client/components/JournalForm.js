import React from 'react';
import { connect } from 'react-redux';
import { addJournal, updateJournal }from '../store';

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
    // componentDidMount(){
    //     if(this.props.journal.isPrivate === false){
    //         this.setState({
    //             title: this.props.journal.title,
    //             description: this.props.journal.description,
    //             isPrivate: 2
    //         })
    //     } else if(this.props.journal.isPrivate === true){
    //         this.setState({
    //             title: this.props.journal.title,
    //             description: this.props.journal.description,
    //             isPrivate: 1
    //         })
    //     } else {
    //         this.setState({
    //             title: this.props.journal.title,
    //             description: this.props.journal.description,
    //             isPrivate: 0
    //         })
    //     }
    // };
    // componentDidUpdate(prevProps){
    //     if(!prevProps.journal.id && this.props.journal.id){
    //         if(this.props.journal.isPrivate === false){
    //             this.setState({
    //                 title: this.props.journal.title,
    //                 description: this.props.journal.description,
    //                 isPrivate: 2
    //             })
    //         } else if(this.props.journal.isPrivate === true){
    //             this.setState({
    //                 title: this.props.journal.title,
    //                 description: this.props.journal.description,
    //                 isPrivate: 1
    //             })
    //         } else {
    //             this.setState({
    //                 title: this.props.journal.title,
    //                 description: this.props.journal.description,
    //                 isPrivate: 0
    //             })
    //         }
    //     }
    //     if(prevProps.journal.id && !this.props.journal.id){
    //         this.setState({
    //             title: '',
    //             description: '',
    //             isPrivate: 0
    //         })
    //     }
    // }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { isPrivate } = this.state;
        // if(this.props.journal.id){
        //     if(isPrivate === '2'){
        //         this.props.updateJournal({...this.state, isPrivate: false});
        //     } else {
        //         this.props.updateJournal({...this.state, isPrivate: true});
        //     }
        // } else {
        //     if(isPrivate === '2'){
        //         this.props.addJournal({...this.state, isPrivate: false}, this.props.auth);
        //     } else {
        //         this.props.addJournal({...this.state, isPrivate: true}, this.props.auth);
        //     }
        // }
        if(isPrivate === '2'){
            this.props.addJournal({...this.state, isPrivate: false}, this.props.auth);
        } else {
            this.props.addJournal({...this.state, isPrivate: true}, this.props.auth);
        }
        this.setState({
            title: '',
            description: '',
            isPrivate: 0
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
                    <select value={ isPrivate || 0} name='isPrivate' onChange={ onChange }>
                        <option value={0} disabled>Select Privacy</option>
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