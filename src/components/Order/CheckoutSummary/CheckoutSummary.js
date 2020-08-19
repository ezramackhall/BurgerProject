import React from "react";

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here Is Your Burger</h1>
            <div style={{width:'100%', height: '400px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.cancelClick}
            >
                Cancel
            </Button>
            <Button
                btnType="Success"
                clicked={props.continueClick}
            >
                Continue
            </Button>
        </div>
    )
};

export default checkoutSummary;