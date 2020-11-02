import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../redux/orderHistory/orderHistory';

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders } = this.props;
    if (orders.length > 0) {
      return (
        <div>
          <h1>Previous Orders:</h1>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Total: $
                {order.total}
                <ul>
                  {order.costumes.map((costume) => (
                    <li key={costume.id}>
                      <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div>No Previous Orders</div>
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
