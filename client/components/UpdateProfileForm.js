import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';

class ProfileForm extends Component {
    constructor() {
      super();
      this.state = {
        firstName: '',
        lastName: '',
        password: '',
        username: '',
        verifyPassword: '',
        image: ''
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
            password: '',
            username: this.props.auth.username,
            image: this.props.auth.image,
            verifyPassword: ''
        })
    };
    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
            this.setState({
                firstName: this.props.auth.firstName,
                lastName: this.props.auth.lastName,
                password: '',
                username: this.props.auth.username,
                image: this.props.auth.image,
                verifyPassword: ''
            })
        }
        if(prevProps.auth.id && !this.props.auth.id){
            this.setState({
                firstName: '',
                lastName: '',
                password: '',
                username: '',
                image: '',
                verifyPassword: ''
            });
        }
    }
    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    validatePassword = () => {
        if(this.state.password === this.state.verifyPassword){
            return true
        } else {
            return false
        }
    };
    handleSubmit = (e) => {
      e.preventDefault(e);
      const verify = this.validatePassword();
      if(!verify){
        alert('Password did not match. Please try Again.')
      } else {
        this.props.updateUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            image: this.state.image
        });
      }
      this.closeForm();
    };
    closeForm(){
      document.getElementById("updateProfile-form").style.width = '0';
      document.getElementById("profile-app").style.marginRight = '0';
    }
    render() {
      const { username, firstName, lastName, password, verifyPassword } = this.state;
      const { onChange, handleSubmit, closeForm} = this;
      return (
        <section className='sidebar' id="updateProfile-form">
          <form onSubmit={handleSubmit}>
            <input
                placeholder='First Name'
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChange}
                required
            />
            <input
                placeholder='Last Name'
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
                required
            />
            <input
            placeholder='Username'
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
            />
            <input
                placeholder='New Password'
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
            />
            <input
            placeholder='Retype New Password'
                type="password"
                name="verifyPassword"
                value={verifyPassword}
                onChange={onChange}
                required
            />
            <button type="submit" className='create-btn'>Update Account</button>
            <button className="closebtn" onClick={() => closeForm()}>Cancel</button>
          </form> 
        </section>
      );
    }
  }
  
  const mapState = (state) => {
    return {
        auth: state.auth
    };
  };
  const mapDispatch = (dispatch) => {
    return {
      updateUser: (data) => {
        dispatch(updateUser(data))
      }
    }
  };
  export default connect(mapState, mapDispatch)(ProfileForm);