import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "../../server/public/css/styles.css"


export default class NavBar extends Component {
  render() {

    return (
      <div >
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Grace Shockers</a>
              <Link to="/home" className="navbar-item">Home</Link>
              <Link to="/categories" className="navbar-item">Category View</Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-black">
                    <strong>Register</strong></a>
                  <a className="button is-black">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div>
          <div className="sidenav">
            <Link to="/home">All Costumes</Link>
            <Link to="/categories/disney">Disney</Link>
            <Link to="/categories/adult">Adult</Link>
            <Link to="/categories/villians">Villians</Link>
            <Link to="/categories/inanimateobjects">Inanimate Objects</Link>
            <Link to="/categories/superheroes">Superheroes</Link>
          </div>
        </div>
      </div >
    )
  }
}
