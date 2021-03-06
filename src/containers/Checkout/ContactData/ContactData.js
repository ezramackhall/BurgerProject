import React, {Component} from "react";
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state={
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest'
            },
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for (let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value
        };
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({loading:false});
            });
    };

    checkValidity(value, rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }
        }
        return isValid
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            if(updatedOrderForm[inputIdentifier].valid !== undefined) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render() {

        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(el => <Input
                key = {el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                onChange={(event) => this.inputChangedHandler(event, el.id)}
            />)}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
        </form>);
        if(this.state.loading) {
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);