import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSCostumeDispatch } from '../../redux/costumes/singleCostume';
import { selectCategory } from '../../redux/categories/singleCategory'

class EditCostume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costId: this.props.match.params.costId,
      catId: this.props.match.params.catId
      // costumeName: this.props.costume.costumeName,
      // price: this.props.costume.price,
      // quantity: this.props.costume.quantity,
      // imageUrl: this.props.costume.imageUrl,
      // categoryId: this.props.costume.categoryId
    };
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.costId);
    await this.props.dispatchSelectCategory(this.state.catId);
  }

  render() {
    const thisCostume = this.props.sCostume;
    const thisCategory = this.props.sCategory

    return (

      <div className="container">
        <h2>
          Update Costume Information:
          {thisCostume.costumeName}
        </h2>
        <div>
          Name:{' '}
          <input value={thisCostume.costumeName} />
        </div>
        <div>
          Price:{' '}
          <input value={thisCostume.price} />
        </div>
        <div>
          Quantity: {' '}
          <input value={thisCostume.quantity} />
        </div>
        <div>
          ImageUrl: {' '}
          <input value={thisCostume.imageUrl} />
        </div>
        <div>
          Category: {' '}
          <input value={thisCategory.title} />
        </div>
        <div><button>Submit Changes</button></div>
        {/* <div><input value={categories.find(element => { element.id === thisCostume.categoryId }).id}></input><button>update</button></div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sCostume: state.sCostume,
  sCategory: state.selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
  dispatchSelectCategory: (id) => dispatch(selectCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCostume);

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
