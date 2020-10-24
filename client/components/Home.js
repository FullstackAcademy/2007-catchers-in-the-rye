import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import loadCostumesDispatch from "../redux/actions/loadCostumes"

class Home extends Component {
  async componentDidMount() {
    await this.props.dispatchLoadCostumes();
  }

  render() {
    console.log(this.props.costumes)
    return (
      <div className="costumesList">
        <h5>Costume List</h5>
        <div>
          {this.props.costumes.map((costume) => {
            return (
              <li key={costume.id} className="costumes" >
                <div>{costume.costumeName}</div>
                <div>{costume.price}</div>
              </li>
            )
          })}
        </div>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    costumes: state.costumes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoadCostumes: () => dispatch(loadCostumesDispatch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
