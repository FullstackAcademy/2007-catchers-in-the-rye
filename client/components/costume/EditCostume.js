import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadSCostumeDispatch } from "../../redux/costumes/singleCostume"
import { fetchCategories } from "../../redux/categories/allCategories"

class EditCostume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      // costumeName: this.props.costume.costumeName,
      // price: this.props.costume.price,
      // quantity: this.props.costume.quantity,
      // imageUrl: this.props.costume.imageUrl,
      // categoryId: this.props.costume.categoryId
    }
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.id)
    await this.props.dispatchFetchCategories()
  }

  render() {

    let thisCostume = this.props.sCostume
    let categories = this.props.categories

    return (

      <div className="container">
        <h2>Update Costume Information: {thisCostume.costumeName} </h2>
        <div>Name: <input value={thisCostume.costumeName}></input></div>
        <div>Price: <input value={thisCostume.price}></input></div>
        <div>Quantity: <input value={thisCostume.quantity}></input></div>
        <div>ImageUrl: <input value={thisCostume.imageUrl}></input></div>
        <div>Category: <input value={thisCostume.categoryId}></input></div>
        <div><button>Submit Changes</button></div>
        {/* <div><input value={categories.find(element => { element.id === thisCostume.categoryId }).id}></input><button>update</button></div> */}
      </div >
    )
  }
}



const mapStateToProps = (state) => {
  return {
    sCostume: state.sCostume,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
    dispatchFetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCostume)














//   componentDidMount() {
//     this.props.fetchCostume(this.props.id)
//     const { costumeName, price, quantity, imageUrl, categoryId } = this.props.costume
//     this.setState({ costumeName, price, quantity, imageUrl, categoryId })
//   }
//   render() {
//     console.log(this.props)
//     const { state } = this
//     const { costumeName, price, quantity, imageUrl, categoryId } = state
//     return (<div><div>This is where admins can edit costumes </div>
//       <div>{costumeName}</div></div>)
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.match.params.id * 1
//   const costume = state.singleCostume
//   return {
//     id,
//     costume
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchCostume: (id) => dispatch(fetchCostume(id))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditCostume)