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
      <div className="success">
        <h1>Your Payment Was Successful!</h1>
        <button className="button" type="button" onClick={this.keepShopping}>Continue Shopping</button>
      </div>
    );
  }
}
