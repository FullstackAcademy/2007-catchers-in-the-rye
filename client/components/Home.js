import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCostumesDispatch } from '../redux/costumes/allCostumes';
import { fetchCategories } from '../redux/categories/allCategories';

class Home extends Component {

  async componentDidMount() {
    if (!this.props.costumes.length) {
      await this.props.dispatchLoadCostumes();
      await this.props.fetchCategories();
    }
  }

  render() {
    // console.log(this.props.costumes)
    return (
      <div className="costumesList">
        <h5>Costume List</h5>
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

const mapStateToProps = (state) => ({
  costumes: state.costumes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadCostumes: () => dispatch(loadCostumesDispatch()),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
