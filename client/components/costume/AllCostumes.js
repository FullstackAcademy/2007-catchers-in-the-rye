import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCostumesDispatch } from '../../redux/costumes/allCostumes';

class AllCostumes extends Component {
  componentDidMount() {
    this.props.loadCostumesDispatch()
  };
  render() {
    const {
      categories, selectedCategoryName, costumes
    } = this.props
    const selectedCategory = categories.find((category) => category.title === selectedCategoryName)
    return (
      <div className="costumesList">
        <div>
          <h1>{selectedCategory ? selectedCategoryName : 'All'} Costumes</h1>
          {selectedCategory ?
            costumes.map((costume) => costume.categoryId === selectedCategory.id ? (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                    Update &nbsp;
                    {costume.costumeName}
                  </Link>
                </div>
                <div>${costume.price}</div>
                <br />
              </div>
            )
              : null)
            :
            costumes.map((costume) => (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                    Update &nbsp;
                      {costume.costumeName}
                  </Link>
                </div>
                <div>${costume.price}</div>
                <br />
              </ div>
            ))
          }
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  selectedCategoryName: ownProps.match.params.name,
  categories: state.categories,
  costumes: state.costumes,
});

const mapDispatchToProps = (dispatch) => ({
  loadCostumesDispatch: () => dispatch(loadCostumesDispatch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCostumes);
