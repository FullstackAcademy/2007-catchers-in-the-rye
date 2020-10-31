import React, { Component } from "react"
import { connect } from "react-redux"
import { loadSCostumeDispatch } from "../../redux/costumes/singleCostume"
import { addCostumeToCart } from "../../redux/cart/cart"

class SingleCostume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    }
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.id)
  }

  render() {


    const thisCostume = this.props.sCostume
    return (
      <div className="container">
        <div>{thisCostume.costumeName}</div>
        <div>{thisCostume.price}</div>
        <img src={thisCostume.imageUrl}></img>
        <button onClick={() => this.props.addCostumeToCart(thisCostume.id)}>Add costume to cart</button>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    sCostume: state.sCostume
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
    addCostumeToCart: (costumeId) => dispatch(addCostumeToCart)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCostume)