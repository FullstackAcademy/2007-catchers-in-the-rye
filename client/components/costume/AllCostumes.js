/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Costume from './CostumeCard'
import { loadCostumesDispatch } from '../../redux/costumes/allCostumes';

class AllCostumes extends Component {
  componentDidMount() {
    this.props.loadCostumesDispatch();
  }

  render() {
    const {
      categories, selectedCategoryName, costumes, user,
    } = this.props;
    const selectedCategory = categories.find((category) => category.title === selectedCategoryName);
    return (
      <div className="costumesList">
        <div>
          <h1>{selectedCategory ? selectedCategoryName : 'All'} Costumes</h1>
          {selectedCategory ?
            costumes.map((costume) => (costume.categoryId === selectedCategory.id ? <Costume key={costume.id} costume={costume} /> : null))
          :
            costumes.map((costume) => (<Costume key={costume.id} costume={costume} />))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedCategoryName: ownProps.match.params.categoryTitle,
  categories: state.categories,
  costumes: state.costumes,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadCostumesDispatch: () => dispatch(loadCostumesDispatch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCostumes);
