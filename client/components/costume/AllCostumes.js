import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCostumesDispatch } from '../../redux/costumes/allCostumes';

class Home extends Component {
  componentDidMount() {
    if (!this.props.costumes.length) {
      this.props.dispatchLoadCostumes();
    }
  }

  render() {
    console.log(this.props.categoryId)
    return (
      <div className="costumesList">
        <h5>Costumes</h5>
        <div>
          {this.props.costumes.length && this.props.costumes.map((costume) => (
            <li key={costume.id} className="costumes">
              <div><Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link></div>
              <div>
                <Link to={`/costumes/${costume.costumeName}/${costume.id}/${costume.categoryId}/admin`}>
                  Update
                  {costume.costumeName}
                </Link>
              </div>
              <div>{costume.price}</div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    categoryId: ownProps.match.params.id * 1,
    costumes: state.costumes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadCostumes: () => dispatch(loadCostumesDispatch()),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCostumes);
