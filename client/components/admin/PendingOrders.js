/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PendingOrders extends Component {
  render() {
    return(
            <h1>Pending Orders</h1>
    );
  }
};

const mapStateToProps = (state) => {
    orders: state.
}
