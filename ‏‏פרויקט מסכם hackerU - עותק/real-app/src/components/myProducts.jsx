import React from 'react';
import Card from "./card";
import Popup from './common/popup';
import Successful from './common/successful';
import AddCredit from './addCredit';
import Loaded from "./common/loaded";
import cardService from "../services/cardService";
import creditService from "../services/creditService";
import {toast} from "react-toastify";

 class myProducts extends React.Component  {
     constructor(props){
         super(props);
        this.state = {
          cards:[],
          flag:true,
          buttonLoaded:false,
          buttonSuccessful:false,
          buttonAddcredit:false
        };
        this.setButtonAddcredit = this.setButtonAddcredit.bind(this);
        this.setButtonSuccessful = this.setButtonSuccessful.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
     };

     async componentDidMount() {
      if (this.props.cards){
        this.setState({flag:false});
        return this.setState({ cards: this.props.cards });
      };
        const { data } = await cardService.getMyCards();
        this.setState({ cards: data,flag:false });

    };
    async buyProduct(){
      const indication =await (await creditService.pay()).data;
      
      if (indication.length===0) {
        return this.setState({buttonAddcredit:true});
      };

      this.setState({buttonLoaded:true});
       const cards = await (await cardService.putCards()).data;
       if (!cards) {
        return setTimeout(() => {
         this.setState({buttonLoaded:false});
          toast("Undable to open new order",{className:'alert alert-warning'});
        },1000)
       };
       setTimeout(() => {
         this.setState({buttonLoaded:false});
        }, 1000);
        
        return setTimeout(() => {
          this.setState({buttonSuccessful:true});
          this.props.changeCards([]);
          this.setState({cards:[]});
      }, 1000);
    };

    async deleteProduct(id){
      const cards = await cardService.deleteProduct(id);
      this.props.changeCards(cards.data);
      this.setState({cards:cards.data});
    };


    setButtonAddcredit(t){
      this.setState({buttonAddcredit:t});
    };
    setButtonSuccessful(t){
      this.setState({buttonSuccessful:t});
    };

  render() {
      const {cards} = this.state
      const {flag} = this.state
      const {buttonLoaded} = this.state
      const {buttonSuccessful} = this.state
      const {buttonAddcredit} = this.state
    return (
        <div className="container">
        <Popup trigger={buttonLoaded} text={"payment in process"}>
          <Loaded/>
        </Popup>
        <Popup trigger={buttonSuccessful} closePopup={this.setButtonSuccessful}>
          <Successful message={"the payment was succesful"} button={"view order"}/>
        </Popup>
        <Popup trigger={buttonAddcredit} closePopup={this.setButtonAddcredit}>
          <AddCredit closePopup={this.setButtonAddcredit}/>
        </Popup>
        <div className="row">
          <div className="col-12">    
            {!flag?(
              cards.length>0?
                (
                  <>
                  <h1>your cart</h1>
                    {[1].map((e)=>{
                    let totalPrice = 0
                    return(
                      <div key={e} className="row">
                          {cards.length > 0 && cards.map(cards => {
                            totalPrice = totalPrice+ Number(cards.totalPrice)
                          return(
                          <Card key={cards._id} card={cards}
                            addCard={this.addCard}
                            deleteProduct={this.deleteProduct}/>
                          )})}
                        <h4>price:{totalPrice.toFixed(2)}</h4> 
                      </div>
                    )})
                  
                  }
                  {cards.length>0?(
                  <p className='mt-3'>
                    <button className='btn bg-primary' onClick={()=>{this.buyProduct()}}>Buy</button>
                  </p>):('')}
                  </>
                ):(
                  <h1>The cart is empty</h1>
                )
            ) : (
              <Loaded/>
            )}
          </div>
        </div>
       
        
      </div>
    );
  };
};

export default myProducts