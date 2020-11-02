import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/categories/singleCategory';

class SingleCategory extends Component {
  async componentDidMount() {
    const category = this.props.categories.find((c) => c.title.toLowerCase() === this.props.match.params.title.toLowerCase());
    await this.props.selectCategory(category.id);
  }

  render() {
    const { selectedCategory } = this.props;
    const costumesInCategory = selectedCategory.costumes;
    if (costumesInCategory) {
      return (
        <div id="singleCategory">
          <h1>{selectedCategory.title}</h1>
          <ul>
            {costumesInCategory.map((costume) => (
              <li key={costume.id}>
                <div>{costume.costumeName}</div>
                <img src={costume.imageUrl} />
                <div>{costume.price}</div>
              </li>
            ))}
          </ul>
        </div>
      );
    } return null;
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  selectedCategory: state.selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (id) => {
    dispatch(selectCategory(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory);
