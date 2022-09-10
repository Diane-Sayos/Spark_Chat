import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';
const ImageProfileForm = ({ auth, updateUser }) => {
    const [image, setImage] = useState('');
    const onChangeImage = (e) => {
        console.log(e.target.files)
        const updateImage = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImage(reader.result)
        });
        reader.readAsDataURL(updateImage);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(image)
        updateUser({
            firstName: auth.firstName,
            lastName: auth.lastName,
            userName: auth.username,
            password: auth.password,
            image: image
        })
        setImage('');
    };
    const closeForm = () => {
        document.getElementById("imageProfile-form").style.width = '0';
        document.getElementById("profile-app").style.marginRight = '0';
    }
    return (
        <section id='imageProfile-form'>
            <form onSubmit={ handleSubmit }>
                <label>Image:<br />
                    <input
                        type='file'
                        onChange={ onChangeImage }
                    />
                </label>
                {
                    image ? <img src={image} width='120' height='120'/> : null
                }
                <button type='submit'>Update Avatar</button>
            </form>
            <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
        </section>
    )
};
const mapState = state => {
    return {
        auth: state.auth
    }
}
const mapDispatch = dispatch => {
    return {
        updateUser: (data) => {
            dispatch(updateUser(data))
        }
    }
}
export default connect(mapState, mapDispatch)(ImageProfileForm);