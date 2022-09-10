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
            this.props.addImage(image, this.props.journal.id)
        });
        this.setState({images: []});
        this.closeForm();
    };
    closeForm(){
        document.getElementById("image-form").style.width = '0';
        document.getElementById("journal-app").style.marginRight = '0';
    };
    render(){
        const { onChangeImage, handleSubmit, closeForm } = this;
        const { images } = this.state;
        return (
            <section className='sidebar' id="image-form">
            <form onSubmit={ handleSubmit }>
                <label>Image:<br />
                    <input
                        type='file'
                        multiple
                        onChange={ onChangeImage }
                    />
                </label>
                <ul className='form-images-display'>
                {
                    images.map(image => {
                        return (
                            <li key={image}><img src={image? image : null} width='120' height='120'/></li>
                        )
                    })
                }
                </ul>
                <button type='submit'>Add Image</button>
                <button onClick={() => this.setState({images: []})}>Reset</button>
            </form>
            <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
        </section>
        )
    }
};
const mapState = (state, { match }) => {
    const journal = state.journals.find(journal => journal.id === match?.params.id*1) || {};
    return {
        journal,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        addImage: (image, journalId) => {
            dispatch(addImage(image, journalId))
        }
    }
};
export default connect(mapState, mapDispatch)(ImageForm);