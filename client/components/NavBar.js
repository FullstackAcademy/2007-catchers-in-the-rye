import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../server/public/css/styles.css';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
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
                  <a className="button is-black">
                    <strong>Register</strong>
                  </a>
                  <Link to="/login" className="button is-black">Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

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
