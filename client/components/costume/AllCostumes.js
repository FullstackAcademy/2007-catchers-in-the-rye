/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
            costumes.map((costume) => (costume.categoryId === selectedCategory.id ? (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                { user.userType === 'admin'
                  ? (
                    <div>
                      <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                        Update &nbsp;
                        {costume.costumeName}
                      </Link>
                    </div>
                  )
                  : null }
                <div>
                  $
                  {costume.price.toFixed(2)}
                </div>
                <br />
              </div>
            )
              : null))
            : costumes.map((costume) => (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                { user.userType === 'admin'
                  ? (
                    <div>
                      <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                        Update &nbsp;
                        {costume.costumeName}
                      </Link>
                    </div>
                  ) : null }
                <div>
                  $
                  {costume.price.toFixed(2)}
                </div>
                <br />
              </div>
            ))}
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
