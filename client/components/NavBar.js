/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/categories/allCategories';
import { logout, getUser } from '../redux/authentication/user';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: 'all'
    }
    this.selectCategory = this.selectCategory.bind(this);
  }
  componentDidMount() {
    this.props.fetchCategories();
    await this.props.checkCookiesSetSession();
    this.props.getUser();
  }
  selectCategory (input) {
    this.setState({
      selectedCategory: input,
    })
  }
  render() {
    const { selectCategory, props, state } = this;
    const { categories, user, logout } = props;   
    const { selectedCategory } = state;
    return (
      <div>
        <div className="topnav" role="navigtion" aria-label="main navigation">
          <div className="logo">
            <a>Grace Shockers</a>
          </div>
          <div className="topnav-links">
            <div className= "topnav-left">  
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/cart" className="navbar-item">Cart</Link>
                <Link to="/orderHistory" className="navbar-item">Order History</Link>
            </div>
            <div className= "topnav-right">  
              <a className="navbar-item">Welcome, {user.id ? user.firstName : 'Guest'}!</a>
                {user.id ? (
                  <div className="buttons">
                    <Link to="/home" className="button is-black">Account Settings</Link>
                    <Link to="/login" className="button is-black" onClick={logout}>Log out</Link>
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
        {/* Bulma code for reference */}
        {/* <div className="navContainer">
          <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation" id= "topNav">
            <div className="navbar-brand">
              <a className="navbar-item">Grace Shockers</a>
              <Link to="/home" className="navbar-item">Home</Link>
              <Link to="/cart" className="navbar-item">Cart</Link>
              <Link to="/orderHistory" className="navbar-item">Order History</Link>
            </div>
            <div id="navbarBasicExample" className="navbar-menu is-active">
              <div className="navbar-start">
 
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
        </div> */}

        <div className="sidenav" role="navigation" aria-label="search costumes by category">
          <p>Select a Category:</p>
          <Link className={selectedCategory === "all" ? "selected" : null} to="/categories/all" onClick={() => selectCategory('all')}>All</Link>
          {
            categories.map((category) => (
              <Link className={selectedCategory === category.title ? "selected" : null} key={category.id} 
              to={`/categories/${category.title}`} onClick={() => selectCategory(`${category.title}`)}>
                {category.title}
              </Link>
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
