import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/categories/allCategories';
import '../../server/public/css/styles.css';

class NavBar extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
      
        <div className="navContainer">
          <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item">Grace Shockers</a>
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/cart" className="navbar-item">Cart</Link>
                <Link to="/orderHistory" className="navbar-item">Order History</Link>
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

        <div className="sidenav">
          <p>Select a Category:</p>
          <Link to="/home">All</Link>
          {
                                categories.map((category) => (
                                  <Link key={category.id} to={`/categories/${category.title}`}>{category.title}</Link>
                                ))
                          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => {
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
