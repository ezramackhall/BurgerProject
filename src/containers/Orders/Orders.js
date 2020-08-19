import React, {Component} from 'react';

import axios from '../../axios-orders'
import OrderComp from '../../components/Order/Order';

class Order extends Component {
    state = {
        orders: [],
        loading: true,
        error: false
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then((res) => {
                const fetchedOrders = []
                for (let key in res.data){
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                this.setState({orders: fetchedOrders});
                this.setState({loading: false});
            })
            .catch((err) => {
                console.log(err);
                this.setState({error: err});
                this.setState({loading: false});
            })
    }

    render() {
        let body =  <div>
            {this.state.orders.map(order => (
                <OrderComp
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))}
        </div>

        if(this.state.error){
            body = <div>
                <p>{this.state.error.message}</p>
            </div>
        }
        return(
            <div>
                {body}
            </div>
        );
    };
}

export default Order