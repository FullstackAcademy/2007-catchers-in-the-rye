/* eslint-disable react/jsx-filename-extension */
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
        <img src={thisCostume.imageUrl} />
        <div>${thisCostume.price} <span id="old-price">${(thisCostume.price / (1 - thisCostume.discount)).toFixed(2)}</span> FINAL SALE</div>
        <div>Material: {thisCostume.material}</div>
        <div>Made in: {thisCostume.madeIn}</div>
        <div>One size fits most adults</div>
        <select onChange={this.changeQuantity}>
          <option>Select quantity:</option>
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
