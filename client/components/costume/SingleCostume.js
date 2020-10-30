import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSCostumeDispatch } from '../../redux/actions';

class SingleCostume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.id);
  }

  render() {
    const thisCostume = this.props.sCostume;
    return (
      <div className="container">
        <div>{thisCostume.costumeName}</div>
        <div>{thisCostume.price}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sCostume: state.sCostume,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCostume);
