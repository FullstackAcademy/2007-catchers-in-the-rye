import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/authentication/user';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: '',
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  setUsername(ev) {
    this.setState({ username: ev.target.value });
  }

  setPassword(ev) {
    this.setState({ password: ev.target.value });
  }

  async submit(ev) {
    ev.preventDefault();
    try {
      if (this.props.type === 'login') this.props.login(this.state);
      // can use below code when we have option to create user
      // else if(this.props.type === 'create') response = (await axios.post('/api/user/create',this.state)).data
      this.setState({ message: this.props.message });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      if (this.props.type === 'login') this.setState({ message: 'Log in failed - check username and/or password' });
      else if (this.props.type === 'create') this.setState({ message: 'Could not create account' });
    }
  }

  render() {
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
          <button type="submit">Login</button>
        </form>
        <p>{this.props.user.message}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (loginInfo) => dispatch(login(loginInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
