import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSCostumeDispatch } from '../../redux/costumes/singleCostume';
import { addCostumeToCart, fetchCart } from '../../redux/cart/cart';

class SingleCostume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      quantity: 0,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.addCostumeToCart = this.addCostumeToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.dispatchLoadSCostume(this.state.id);
  }

  changeQuantity(ev) {
    this.setState({ quantity: ev.target.value });
  }

  async addCostumeToCart(costumeId, quantity) {
    await this.props.addCostumeToCart(costumeId, quantity);
    await this.props.fetchCart();
    this.props.history.push('/cart');
  }

  render() {
    const thisCostume = this.props.sCostume;
    return (
      <div className="container">
        <div>{thisCostume.costumeName}</div>
        <div>{thisCostume.price}</div>
        <img src={thisCostume.imageUrl} />
        <select onChange={this.changeQuantity}>
          <option>Select quantity below:</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button onClick={() => this.addCostumeToCart(thisCostume.id, this.state.quantity * 1)}>Add costume to cart</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sCostume: state.sCostume,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadSCostume: (id) => dispatch(loadSCostumeDispatch(id)),
  addCostumeToCart: (costumeId, quantity) => dispatch(addCostumeToCart(costumeId, quantity)),
  fetchCart: () => dispatch(fetchCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCostume);
