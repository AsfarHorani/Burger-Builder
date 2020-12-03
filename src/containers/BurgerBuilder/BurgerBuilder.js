import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


const INGREDIENT_PRICES={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}


class BurgerBuilder extends Component{
//   constructor(props)
//   {
//       super(props);

//   }

state = {
    ingredients : null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
    
}


componentDidMount()
{
    axios.get('https://burger-builder-89944.firebaseio.com/ingredients.json')
    .then(response=>
    {
        this.setState({ingredients: response.data})
    }) 
    .catch(error=>{
        
        this.setState({error : true})
    })
   
}

updatePurchaseState(ingredients)
{
    // const ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients)
    .map(igkey=>{
        return ingredients[igkey];
    })
    .reduce((sum,el)=>{

        return sum +el; 
    },0)
    this.setState({purchasable: sum > 0})

}

addIngredientHandler=(type)=>
{
    const oldCount = this.state.ingredients[type];
    const updatedCount= oldCount +1;
    const updatedIngredients={...this.state.ingredients}
    updatedIngredients[type] = updatedCount;
    const priceAddition=INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice=oldPrice+priceAddition; 
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
    
};

removeIngredientHandler=(type)=>
{
    const oldCount = this.state.ingredients[type];

    if(oldCount<=0){
        return;
    }
    const updatedCount= oldCount -1;
    const updatedIngredients={...this.state.ingredients}
    updatedIngredients[type] = updatedCount;
    const priceDeduction=INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice=oldPrice-priceDeduction; 
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
}

purchaseHandler=()=>{
    this.setState({purchasing: true});
}

purchaseCancelHandler=()=>{
    this.setState({purchasing: false});
}

purchaseContinueHandler=()=>{
   // alert('You Continue');

const queryParams=[]

for(let i in this.state.ingredients)
{
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.state.totalPrice)
  this.props.history.push({
      pathname: '/checkout',
      search: '?'+ queryParams.join('&')
  });
}

    render()
    {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        
        let orderSummary = null;
        
        if(this.state.ingredients)
        {
            orderSummary=
        <OrderSummary 
        ingredients={this.state.ingredients} 
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)}
        />;
        }if(this.state.loading)
        {
            orderSummary = <Spinner/> 
        }

        
        let burger = this.state.error ? <p> Ingredients can't be loaded! </p> : <Spinner/>
        
        if (this.state.ingredients)
        {   
            burger=(
                <Auxiliary>
                <Burger 
                            
                ingredients={this.state.ingredients}/>
              
                    
              
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemove={this.removeIngredientHandler}
                disabled={disabledInfo }
                price={this.state.totalPrice} 
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                />
              </Auxiliary>)



        }
        
        return(



            
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                 {burger}

            </Auxiliary>

        );
    }
}


export default ErrorHandler(BurgerBuilder, axios);