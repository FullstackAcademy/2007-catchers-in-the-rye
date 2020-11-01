import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../server/public/css/styles.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class NavBar extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <div className="navContainer">
          <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item">Grace Shockers</a>
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/cart" className="navbar-item">Cart</Link>
                {/* <Link to="/categories" className="navbar-item">Category View</Link> */}
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <a className="navbar-item">Welcome, Guest!</a>
                  <div className="buttons">
                    <Link to="/createUser" className="button is-black">Register</Link>
                    <Link to="/login" className="button is-black">Log in</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div>
          <div className="sidenav">
            <Link to="/home">All Costumes</Link>
            <Link to="/categories/Disney">Disney</Link>
            <Link to="/categories/Adult">Adult</Link>
            <Link to="/categories/Villains">Villians</Link>
            <Link to="/categories/Inanimateobjects">Inanimate Objects</Link>
            <Link to="/categories/Superheroes">Superheroes</Link>
          </div>
        </div>
      </div>
    );
  }
}
