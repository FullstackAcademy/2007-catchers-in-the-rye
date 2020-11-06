/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      type, login, createUser,
    } = this.props;
    if (!username.length || !password.length) this.setState({ message: 'All fields are required' });
    else {
      this.setState({ message: '' });
      if (type === 'login') {
        await login(this.state);
        if (!this.props.user.id) this.setState({ message: 'Check username or password' });
        else {
          return <Redirect to="/home" />;
        }
      }
      if (type === 'create') {
        if (!firstName.length || !lastName.length || !userEmail.length) this.setState({ message: 'All fields are required' });
        else {
          await createUser(this.state);
          if (!this.props.user.id) this.setState({ message: 'Could not create account' });
        }
      }
    }
  }

  render() {
    const { type } = this.props;
    return (
      <>
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h1>{ type === 'login' ? 'Login' : 'Create Account' }</h1>
              <div className="box">
                <figure className="avatar">
                  <img id="witch" src="/costumeImages/witch.png" />
                </figure>
                <form onSubmit={this.submit}>
                  <div className="field">
                    <div className="control">
                      <input onChange={this.setUsername} className="input is-large" type="text" placeholder="Username" />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input onChange={this.setPassword} className="input is-large" type="password" placeholder="Password" />
                    </div>
                  </div>
                  { type === 'create' ? (
                    <>
                      <div className="field">
                        <div className="control">
                          <input placeholder="First name" onChange={this.setFirstName} className="input is-large" />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input placeholder="Last name" onChange={this.setLastName} className="input is-large" />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input placeholder="Email" onChange={this.setEmail} className="input is-large" />
                        </div>
                      </div>
                    </>
                  )
                    : null }
                  <button type="submit" className="button is-block is-info is-large is-fullwidth">
                    { type === 'login' ? 'Login' : 'Create Account' } <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                  <p>{ this.state.message }</p>
                </form>
                {/* { this.props.user.id ? <Redirect to="/home" />: null } */}
              </div>
            </div>
          </div>
        </div>
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
