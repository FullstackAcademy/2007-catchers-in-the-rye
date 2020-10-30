import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../redux/categories/allCategories'
import { Link } from "react-router-dom";

class AllCategories extends Component {
    componentDidMount () {
        this.props.fetchCategories();
    }
    render() {
        const { categories } = this.props;
        return (
            <div id = "allCategories">
                <h1>All Categories</h1>
                {
                    <ul id = "categoryList">
                        {
                            categories.map(category => {
                                return(
                                <li key = {category.id} className = "category">
                                  <Link to={`/categories/${category.title}`}>{category.title}</Link>
                                </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)