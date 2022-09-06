import React from 'react';
import { connect } from 'react-redux';
import { addImage } from '../store';

class ImageForm extends React.Component {
    constructor(){
        super()
        this.state = {
            images: []
        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeImage = (e) => {
        console.log(e.target.files)
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({images: [...this.state.images, reader.result]})
        });
        reader.readAsDataURL(image);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.images)
        this.state.images.map(image => {
            this.props.addImage(image, this.props.auth.id, this.props.journal.id)
        });
        this.setState({images: []});
    };
    render(){
        const { onChangeImage, handleSubmit } = this;
        const { images } = this.state;
        return (
            <section>
            <form onSubmit={ handleSubmit }>
                <label>Image:<br />
                    <input
                        type='file'
                        multiple
                        onChange={ onChangeImage }
                    />
                </label>
                <ul>
                {
                    images.map(image => {
                        return (
                            <li key={image}><img src={image? image : null} width='120' height='120'/></li>
                        )
                    })
                }
                </ul>
                <button type='submit'>Add Image</button>
                <button onClick={() => this.setState({images: []})}>Cancel</button>
            </form>
        </section>
        )
    }
};
const mapState = (state, { match }) => {
    const journal = state.journals.find(journal => journal.id === match.params.id*1) || {};
    return {
        journal,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        addImage: (image, authId, journalId) => {
            dispatch(addImage(image, authId, journalId))
        }
    }
};
export default connect(mapState, mapDispatch)(ImageForm);