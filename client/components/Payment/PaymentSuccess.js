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
        <div>You payment was processed!</div>
        <button type="button" onClick={this.keepShopping}>Continue Shopping</button>
      </div>
    );
  }
}
