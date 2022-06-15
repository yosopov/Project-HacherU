import React from "react";
import cardService from "../services/cardService";
import Card from "./card";
import Loaded from "./common/loaded";
import Popup from "./common/popup";
import Signin from "./signin";


class Navigation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        cards: [],
        buttonSigIn:false,
    };
    this.addCard = this.addCard.bind(this);
  };
    
  async componentDidMount(){
    if (!this.props.navigation) {
      return  this.props.navigate("/");
    }
    const { data } = await cardService.getCardsCategory(this.props.navigation);
    if (data.length > 0) this.setState({ cards: data });

  };
  async componentDidUpdate(prevProps,prevState) {
    let productByName = this.props.searchProductByName;

    if (prevProps.navigation !== this.props.navigation) {
       this.setState({ cards: [] });
      const { data } = await cardService.getCardsCategory(this.props.navigation);
      if (data.length > 0) this.setState({ cards: data });
    }
    if (productByName !== "" && productByName!==prevProps.searchProductByName) {
      const { data } = await cardService.getCardsWithName(productByName,prevProps.navigation);
      if (data.length > 0) return this.setState({ cards: data });
      this.setState({ cards: false });
    };
    if (this.state.cards === prevState.cards   && productByName === '') {
       const { data } = await cardService.getCardsCategory(this.props.navigation);
       if (data.length > 0) return this.setState({ cards: data });
    }
  };
  async addCard(card){
    if (!this.props.user) {
      return this.setButtonSigIn(true)
    }
    this.props.addProduct(card);
  };

  setButtonSigIn=(t)=>{
    this.setState({
      buttonSigIn : t
    })
  }
  
  render(){
    const { cards } = this.state;
    const { buttonSigIn } = this.state;

    return (
      <>
     <Popup trigger={buttonSigIn} closePopup={this.setButtonSigIn}><Signin/></Popup>
        <div className="container pb-2">
          <div className="row">
            <div className="col-12">    
            {!cards?(<h3>Sorry your product does not exist in the system</h3>):("")} 
            {cards.length>0 || !(cards) ?(
              ""
            ) : (
              <Loaded/>
            )}
            </div>
          </div>
          <div className="row">
            {cards.length > 0 &&cards.map(card => <Card key={card._id} card={card} addCard={this.addCard}/>)}
          </div>
        </div>
      </>
    );
  };
  };
  
  export default Navigation;
  