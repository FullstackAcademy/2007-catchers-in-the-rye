import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, createUser } from '../../redux/authentication/user';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      userEmail: '',
      message: '',
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.submit = this.submit.bind(this);
  }

  setUsername(ev) {
    this.setState({ username: ev.target.value });
  }

  setPassword(ev) {
    this.setState({ password: ev.target.value });
  }

  setFirstName(ev) {
    this.setState({ firstName: ev.target.value });
  }

  setLastName(ev) {
    this.setState({ lastName: ev.target.value });
  }

  setEmail(ev) {
    this.setState({ userEmail: ev.target.value });
  }

  async submit(ev) {
    ev.preventDefault();
    const {
      username, password, firstName, lastName, userEmail,
    } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      type, login, createUser, user,
    } = this.props;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      console.log(this.state)
      if (!username.length || !password.length) this.setState({ message: 'All fields are required' });
      if (type === 'login') login(this.state);
      else if (type === 'create') {
        if (!firstName.length || !lastName.length || !userEmail.length) this.setState({ message: 'All fields are required' });
        else {
          createUser(this.state);
          // eslint-disable-next-line react/prop-types
          this.setState({ message: user.message });
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      if (type === 'login') this.setState({ message: 'Log in failed - check username and/or password' });
      else if (type === 'create') this.setState({ message: 'Could not create account' });
    }
  }

  render() {
    const { message } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        <form onSubmit={this.submit}>
          <label>
            Username
            <input
              onChange={this.setUsername}
            />
          </label>
          <label>
            Password
            <input
              onChange={this.setPassword}
              type="password"
            />
          </label>
          { this.props.type === 'create' ? (
            <div>
              <label>
                First Name
                <input
                  onChange={this.setFirstName}
                />
              </label>
              <label>
                Last Name
                <input
                  onChange={this.setLastName}
                />
              </label>
              <label>
                Email
                <input
                  onChange={this.setEmail}
                />
              </label>
            </div>
          )
            : null }
          <button type="submit">{this.props.type === 'login' ? 'Login' : 'Create Account' }</button>
        </form>
        <p>{ message }</p>
      </>
    );
  }
}
// need to have boxes for all user fields for create user!
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (loginInfo) => dispatch(login(loginInfo)),
  createUser: (newUserInfo) => dispatch(createUser(newUserInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
