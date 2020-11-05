/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCartQuantity, removeItem } from '../redux/cart/cart';
import { CheckoutForm } from './Payment/CheckoutForm';
// buttons that still need functionality: Checkout / keep shopping
class Cart extends Component {
  constructor() {
    super();
    this.checkout = this.checkout.bind(this);
    this.keepShopping = this.keepShopping.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  calcTotal(costumes) {
    let cartTotal = 0;
    for (const costume of costumes) {
      cartTotal += costume.price * costume.lineitem.quantity;
    }
    return cartTotal.toFixed(2);
  }

  checkout(ev) {
    ev.preventDefault();
    this.props.history.push({
      pathname: '/checkout',
      state: {
        total: this.props.cart.total,
        orderId: this.props.cart.id,
      },
    });
  }

  keepShopping(ev) {
    ev.preventDefault();
    this.props.history.push('/Home');
  }

  render() {
    const { cart, updateCartQuantity, removeItem } = this.props;
    const costumes = cart.costumes ? cart.costumes : [];
    const cartTotal = costumes.length ? this.calcTotal(costumes) : 0;
    return (
      <div>
        <div className= "hero">Your cart</div>
        {costumes.map((costume) => (
          <div key={costume.id}>
            <p>
              <strong>Costume:</strong>
              {costume.costumeName}
            </p>
            <p>
              <strong>Price per unit:</strong>
              $
              {costume.price.toFixed(2)}
            </p>
            <p>
              <strong>Quantity:</strong>
              {costume.lineitem.quantity}
            </p>
            <button onClick={() => updateCartQuantity(costume.id, '+')}>+</button>
            <button onClick={() => updateCartQuantity(costume.id, '-')}>-</button>
            <p>
              <strong>Sub Total:</strong>
              $
              { (costume.price * costume.lineitem.quantity).toFixed(2) }
            </p>
            <button onClick={() => removeItem(costume.id)}>Remove from Cart</button>
            <img src={costume.imageUrl} />
          </div>
        ))}
        <h2>
          <strong>Cart Total: </strong>
          $
          { cartTotal }
        </h2>
        <button type="button" onClick={this.checkout}>Check Out Now</button>
        <button type="button" onClick={this.keepShopping}>Keep Shopping</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  updateCartQuantity: (costumeId, sign) => {
    dispatch(updateCartQuantity(costumeId, sign));
  },
  removeItem: (costumeId) => dispatch(removeItem(costumeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
