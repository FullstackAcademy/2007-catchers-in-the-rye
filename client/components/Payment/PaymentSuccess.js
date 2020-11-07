import React, { Component } from 'react';

export default class PaymentSuccess extends Component {
  constructor() {
    super();
    this.keepShopping = this.keepShopping.bind(this);
  }

  keepShopping(ev) {
    ev.preventDefault();
    this.props.history.push('/Home');
  }

  render() {
    return (
      <div>
        <div>Your payment was processed! A confirmation email has been sent.</div>
        <button type="button" onClick={this.keepShopping}>Continue Shopping</button>
      </div>
    );
  }
}
