import React from "react";

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    let indgredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,  i) => {
                return <BurgerIngredient key={igKey+i} type={igKey}/>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if(indgredientsArray.length === 0){
        indgredientsArray = <p>Please Start Adding Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {indgredientsArray}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;