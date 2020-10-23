import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/singleCategory'

class SingleCategory extends Component {
    componentDidMount() {
        //this.props.selectCategory(this.props.selectedId)
    }
    render() {
        const { selectedCategory } = this.props;
        // should be fleshed out more based on api routes to include all costumes belonging to a category
        return (
            <div id = "singleCategory">
                <h1>Single Category</h1>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const selectedId = ownProps.match.params.id * 1
    const selectedCategory = state.selectedCategory
    return {
        selectedId,
        selectedCategory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCategory: (id) => {
            dispatch(selectCategory(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)