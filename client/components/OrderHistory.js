import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../redux/orderHistory/orderHistory'

class OrderHistory extends Component {
    componentDidMount(){
        this.props.fetchOrders()
    }

    render(){
        const { orders } = this.props
        console.log(orders)
        //Can't pull costumes as orders is an array
        const { costumes } = orders
        return (
            <div>
                <hr></hr>
            </div>
        )
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