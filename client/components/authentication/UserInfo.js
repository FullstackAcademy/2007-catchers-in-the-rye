/* eslint-disable react/jsx-filename-extension */
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
      username, password, firstName, lastName, userEmail, user,
    } = this.state;
    const {
      type, login, createUser,
    } = this.props;
    if (!username.length || !password.length) this.setState({ message: 'All fields are required' });
    else {
      this.setState({ message: '' });
      if (type === 'login') {
        await login(this.state);
        if (!user.id) this.setState({ message: 'Check username or password' });
      }
      if (type === 'create') {
        if (!firstName.length || !lastName.length || !userEmail.length) this.setState({ message: 'All fields are required' });
        else {
          await createUser(this.state);
          if (!user.id) this.setState({ message: 'Could not create account' });
        }
      }
    }
  }

  render() {
    const { type } = this.props;
    return (
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
          { type === 'create' ? (
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
          <button type="submit">{ type === 'login' ? 'Login' : 'Create Account' }</button>
        </form>
        <p>{ this.state.message }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (loginInfo) => dispatch(login(loginInfo)),
  createUser: (newUserInfo) => dispatch(createUser(newUserInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
