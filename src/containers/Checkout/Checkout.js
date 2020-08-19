import React, {Component} from "react";
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from  '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('./checkout/contact-data')
    };


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelClick={this.checkoutCanceledHandler}
                    continueClick={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);