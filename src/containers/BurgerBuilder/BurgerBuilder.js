import React, {Component} from "react";
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actions';
//import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null,
        orderError: null
    };

    componentDidMount() {

        // axios.get('https://burgerproject-d29cf.firebaseio.com/ingredients.json')
        //     .then((response) => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch((err) => {
        //         this.setState({error: err})
        //     });
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
         return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing:true})
    };

    endPurchase = () => {
        this.setState({purchasing:false});
        this.setState({orderError: null});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render(){
        const disabledInfo = {
          ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients cant be loaded</p> : <Spinner/>;

        if(this.props.ings){
            burger = <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    disabledOrder={!this.updatePurchasable(this.props.ings)}
                    price={this.props.totalPrice.toFixed(2)}
                    purchaseHandler={this.purchaseHandler}
                />
            </Aux>;
            orderSummary = this.state.orderError ? <p>Error Submitting Order</p> :
            <OrderSummary
                cancel={this.endPurchase}
                continue={this.purchaseContinueHandler}
                price={this.props.totalPrice}
                ingredients={this.props.ings}
            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
          <Aux>
              <Modal
                  show={this.state.purchasing}
                  closeModal={this.endPurchase}
              >
                  {orderSummary}
              </Modal>
              {burger}
          </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => {
            dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})
        },
        onIngredientRemoved: (ingName) => {
            dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

