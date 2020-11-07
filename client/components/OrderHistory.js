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
    if (orders.length) {
      return (
        <div>
          <h1>Previous Orders:</h1>
          <div>
            {orders.map((order) => {
              const date = new Date(order.createdAt);
              const readableDate = date.toDateString();
              return (
                <div key={order.id}>
                  <div className="orderText">Order Date: {readableDate}</div>
                  <div className="orderText">
                    Item Total: $
                    {order.total}
                  </div>
                  <div>
                    {order.costumes.map((costume) => (
                      <div className="costumes" key={costume.id}>
                        <img src={costume.imageUrl} />
                        <div>
                        <Link to={`/costumes/${costume.costumeName}`}>{costume.costumeName}</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
