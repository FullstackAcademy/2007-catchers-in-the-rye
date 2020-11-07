import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSCostumeDispatch } from '../../redux/costumes/singleCostume';
import { updateCostumeDispatch } from '../../redux/costumes/allCostumes';
import { fetchCategories } from '../../redux/categories/allCategories';
import { selectCategory } from '../../redux/categories/singleCategory';

class EditCostume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costumeId: this.props.match.params.costumeId,
      costumeCategoryId: this.props.match.params.categoryId,
      costumeName: '',
      price: '',
      imageUrl: '',
      quantity: '',
      categoryId: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.costumeId);
    await this.props.dispatchSelectCategory(this.state.costumeCategoryId);
  }

  handleInputChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const thisCostume = this.props.sCostume;
    const { categories } = this.props;
    const thisCategory = categories.find((category) => category.id === thisCostume.categoryId);
    return (

      <div className="container">
        <h2>
          Update Costume Information:
          {thisCostume.costumeName}
        </h2>
        <hr />
        <form onSubmit={() => { this.props.dispatchUpdateCostume(this.state.costumeId, { costumeName: this.state.costumeName }); }}>
          <label>
            Current Name:
            {'  '}
            {thisCostume.costumeName}
            <div>
              New Name:

              <input
                name="costumeName"
                type="text"
                placeholder={this.costumeName}
                value={this.state.costumeName}
                onChange={this.handleInputChange}
              />
            </div>
            <input type="submit" value="Update" />
          </label>
        </form>
        <hr />

        <form onSubmit={() => { this.props.dispatchUpdateCostume(this.state.costumeId, { price: this.state.price }); }}>
          <label>
            Current Price:
            {' '}
            {thisCostume.price}
            <div>
              New Price:

              <input
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
            </div>
            <input type="submit" value="Update" />
          </label>
        </form>

        <hr />
        <form onSubmit={() => { this.props.dispatchUpdateCostume(this.state.costumeId, { imageUrl: this.state.imageUrl }); }}>
          <label>
            Current ImageUrl:
            {' '}
            {' '}
            {thisCostume.imageUrl}
            <div>
              New Image Url:

              <input
                name="imageUrl"
                type="text"
                value={this.state.imageUrl}
                onChange={this.handleInputChange}
              />
            </div>
            <input type="submit" value="Update" />
          </label>
        </form>
        <hr />

        <form onSubmit={() => { this.props.dispatchUpdateCostume(this.state.costumeId, { quantity: parseInt(this.state.quantity, 10) }); }}>
          <label>
            Current Quantity:
            {' '}
            {' '}
            {thisCostume.quantity}
            <div>
              New Quantity:

              <input
                name="quantity"
                type="text"
                value={this.state.quantity}
                onChange={this.handleInputChange}
              />
            </div>
            <input type="submit" value="Update" />
          </label>
        </form>
        <hr />

        <form onSubmit={() => { this.props.dispatchUpdateCostume(this.state.costumeId, { categoryId: this.state.categoryId }); }}>
          <label>
            Current Category:
            {' '}
            {' '}
            {thisCategory ? thisCategory.title : null}
            <div>
              New Category:

              <select
                name="categoryId"
                value={this.state.categoryId}
                onChange={this.handleInputChange}
              >
                <option>--Update Category--</option>
                {!!categories && categories
                  .map((category) => (
                    <option key={category.title} value={category.id}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <input type="submit" value="Update" />
          </label>
        </form>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sCostume: state.sCostume,
  categories: state.categories,
  sCategory: state.selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
  dispatchUpdateCostume: (costumeId, changeObj) => dispatch(updateCostumeDispatch(costumeId, changeObj)),
  dispatchFetchCategories: () => dispatch(fetchCategories()),
  dispatchSelectCategory: (id) => dispatch(selectCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCostume);
