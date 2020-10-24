import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../redux/categories'

class AllCategories extends Component {
    componentDidMount () {
        this.props.fetchCategories();
        console.log(this.props.categories)
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
                                    <p>{category.title}</p>
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