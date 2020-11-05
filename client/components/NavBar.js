/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/categories/allCategories';
import { logout, getUser } from '../redux/authentication/user';
import '../../server/public/css/styles.css';
import { checkCookiesSetSession } from '../redux/authentication/session';

class NavBar extends Component {
  async componentDidMount() {
    this.props.fetchCategories();
    await this.props.checkCookiesSetSession();
    this.props.getUser();
  }

  render() {
    const { categories, user, logout } = this.props;
    return (
      <div>
        {/* <div className="navContainer"> */}
          <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation" id= 'topNav'>
            <div className="navbar-brand">
              <a className="navbar-item">Grace Shockers</a>
              <a role="button" className="navbar-burger is-active" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/cart" className="navbar-item">Cart</Link>
                <Link to="/orderHistory" className="navbar-item">Order History</Link>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <a className="navbar-item">Welcome, {user.id ? user.firstName : 'Guest'}!</a>
                  {user.id ? (
                    <div className="buttons">
                      <Link to="/home" className="button is-black">Account Settings</Link>
                      <Link to="/home" className="button is-black" onClick={logout}>Log out</Link>
                    </div>
                  )
                    : (
                      <div className="buttons">
                        <Link to="/createUser" className="button is-black">Register</Link>
                        <Link to="/login" className="button is-black">Log in</Link>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </nav>
        {/* </div> */}

        <div className="sidenav">
          <p>Select a Category:</p>
          <Link to="/categories/all">All</Link>
          {
            categories.map((category) => (
              <Link key={category.id} className="side-nav" to={`/categories/${category.title}`}>{category.title}</Link>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => {
    dispatch(fetchCategories());
  },
  logout: () => {
    dispatch(logout());
  },
  getUser: () => {
    dispatch(getUser());
  },
  checkCookiesSetSession: () => {
    dispatch(checkCookiesSetSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
