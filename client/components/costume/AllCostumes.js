import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCostumesDispatch } from '../../redux/costumes/allCostumes';

class AllCostumes extends Component {
  componentDidMount () {
    const { loadCostumesDispatch } = this.props;
    loadCostumesDispatch()
  };
  render() {
    const { 
      categories, selectedCategoryId, costumes 
    } = this.props
    return (
      <div className="costumesList">
          <h5>{!selectedCategoryId || isNaN(selectedCategoryId) ? 'All' : 
          categories.map((category) => category.id === selectedCategoryId ? category.title : null)} Costumes</h5>
          <div>
            {!selectedCategoryId || isNaN(selectedCategoryId) ?
            costumes.map((costume) => (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                    Update
                    {costume.costumeName}
                  </Link>
                </div>
                <div>{costume.price}</div>
                <br />
              </ div> 
            ))
            :
            costumes.map((costume) => costume.categoryId === selectedCategoryId ? (
              <div key={costume.id} className="costumes">
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                </div>
                <img src={costume.imageUrl} />
                <div>
                  <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                    Update
                    {costume.costumeName}
                  </Link>
                </div>
                <div>{costume.price}</div>
                <br />
              </div>
              )
              : null
            )}
          </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
    selectedCategoryId: ownProps.match.params.id * 1,
    categories: state.categories,
    costumes: state.costumes,
});

const mapDispatchToProps = (dispatch) => ({
  loadCostumesDispatch: () => dispatch(loadCostumesDispatch()),
  selectCategory: (id) => dispatch(selectCategory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCostumes);
