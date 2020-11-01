import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../redux/orderHistory/orderHistory'
import { Link } from 'react-router-dom';

//username: "Orion.Dickinson",
//password: "njHt7wUeYV1Heq9",

class OrderHistory extends Component {
    componentDidMount(){
        this.props.fetchOrders()
    }
    render(){
        const {orders} = this.props
        if (orders.length > 0){
            return (
                <div>
                    <h1>Previous Orders:</h1>
                    <ul>
                        {orders.map(order => {
                            return (
                            <li key={order.id}>
                                Total: ${order.total}
                                <ul>
                                    {order.costumes.map(costume => {
                                        return (
                                            <li key={costume.id}>
                                                <Link to={`/costumes/${costume.costumeName}/${costume.id}`}>{costume.costumeName}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            )
                        })
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No Previous Orders</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)