/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPendingOrders } from '../../redux/PendingOrders/pendingOrders';

class PendingOrders extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  async componentDidMount() {
    await this.props.fetchPendingOrders();
    if (!this.props.pendingOrders.length) this.setState({ message: 'You do not have rights to access this page.' })
  }

  render() {
    const pendingOrders = this.props.pendingOrders.length ? this.props.pendingOrders : [];
    return (
      this.state.message.length
        ? <h1>{this.state.message}</h1>
        :
        <div>
          <h1>Orders to be shipped</h1>
          { pendingOrders.map((order) => (
            <div key={order.id}>
              <p>
                <strong>Name: </strong>
                {order.session.user.firstName} {order.session.user.lastName}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress}
              </p>
              <p>
                <strong>Shipping Method: </strong>
                {order.shippingMethod}
              </p>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              <p>
                <strong>Purchase Date: </strong>
                {order.updatedAt.slice(0, 10)}
              </p>
              <p>
                <strong>Total: </strong>
                $
                {order.total.toFixed(2)}
              </p>
              { order.costumes.map((costume) => (
                <div key={costume.id}>
                  <p>
                    <strong>Costume: </strong>
                    {costume.costumeName}
                  </p>
                  <p>
                    <strong>Quantity: </strong>
                    {costume.lineitem.quantity}
                  </p>
                </div>
              ))}
              <hr />
            </div>
          ))}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingOrders: state.pendingOrders,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPendingOrders: () => dispatch(fetchPendingOrders()),
  // updateShipping: (orderId) => dispatch(updateShipping(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders);
