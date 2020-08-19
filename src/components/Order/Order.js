import React from "react";

import classes from './Order.module.css';

const order = (props) => {
    const ingredientsList = [];
    for (let name in props.ingredients){
        ingredientsList.push({
            name: name,
            amount: props.ingredients[name]
        })
    }

    const ingredientOutput = ingredientsList.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0.8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name}({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
};

export default order;