import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addImage } from '../store';
// const ImageForm = ({ journal, auth, addImage }) => {
//     const [images, setImages] = useState([]);
//     const onChangeImage = (e) => {
//         console.log(e.target.files)
//         const image = e.target.files[0];
//         const reader = new FileReader();
//         reader.addEventListener('load', () => {
//             setImages([...images, reader.result])
//         });
//         reader.readAsDataURL(image);
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(images)
//         images.map(image => {
//             addImage(image, auth.id, journal.id)
//         });
//         setImages([]);
//     };
//     return (
//         <section>
//             <form onSubmit={ handleSubmit }>
//                 <label>Image:<br />
//                     <input
//                         type='file'
//                         multiple
//                         onChange={ onChangeImage }
//                     />
//                 </label>
//                 <ul className='form-images-display'>
//                 {
//                     images.map(image => {
//                         return (
//                             <li key={image}><img src={image? image : null} width='120' height='120'/></li>
//                         )
//                     })
//                 }
//                 </ul>
//                 <button type='submit'>Add Image</button>
//                 <button onClick={() => setImages({images: []})}>Cancel</button>
//             </form>
//         </section>
//     )
// };
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
    closeForm(){
        document.getElementById("image-form").style.width = '0';
        document.getElementById("main-app").style.marginRight = '0';
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
                <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
            </form>
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
        addImage: (image, authId, journalId) => {
            dispatch(addImage(image, authId, journalId))
        }
    }
};
export default connect(mapState, mapDispatch)(ImageForm);