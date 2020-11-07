import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../redux/orderHistory/orderHistory';
import Costume from './costume/CostumeCard'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders } = this.props;
    if (orders.length) {
      return (
        <div>
          <h1>Previous Orders:</h1>
          <ul>
            {orders.map((order) => {
              const date = new Date(order.createdAt);
              const readableDate = date.toDateString();
              return (
                <li key={order.id}>
                  <div className="costume-options">
                    <div><strong>{readableDate}</strong></div>
                    <div>
                      <strong>
                        Total: ${order.total}
                      </strong>
                    </div>
                  </div>
                    {order.costumes.map((costume) => (
                        <Costume key={costume.id} costume={costume} />
                    ))}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return (
      <h1>No Previous Orders</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
