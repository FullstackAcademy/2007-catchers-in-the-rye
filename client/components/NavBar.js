import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "../../css/styles.css"


export default class NavBar extends Component {
  render() {

    return (
      <div >
        <nav class="navbar is-link" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">Grace Shockers</a>
              <a class="navbar-item">Home</a>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Categories</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item">Men</a>
                  <a class="navbar-item">Women</a>
                  <a class="navbar-item">Kids</a>
                  <a class="navbar-item">Scary</a>
                  <a class="navbar-item">Funny</a>
                  <a class="navbar-item">Animals</a>
                  <a class="navbar-item">Movies</a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-black">
                    <strong>Register</strong></a>
                  <a class="button is-black">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div>
          <div class="sidenav">
            <a href="#">All Costumes</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>
            <a href="#">Scary</a>
            <a href="#">Funny</a>
            <a href="#">Animals</a>
            <a href="#">Movies</a>
          </div>
        </div>
      </div>
    )
  }
}
