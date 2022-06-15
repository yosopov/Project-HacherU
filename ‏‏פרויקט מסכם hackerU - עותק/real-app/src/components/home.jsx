import React from "react";
import cardService from "../services/cardService";
import Card from "./card";
import Loaded from "./common/loaded";
import Popup from "./common/popup";
import Signin from "./signin";




class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      cards: [],
      buttonSigIn:false,
      flag:true
    };
    this.addCard = this.addCard.bind(this);

};

    setButtonSigIn=(t)=>{
      this.setState({
        buttonSigIn : t
      });
    };
    
    async componentDidMount() {
      const { data } = await cardService.getCards();
      if (data.length > 0) this.setState({ cards: data });
    };
    async componentDidUpdate(prevProps,prevState){
      let productByName = this.props.searchProductByName;
      if (productByName !== "" && productByName!==prevProps.searchProductByName) {
        const { data } = await cardService.getCardsWithName(productByName);
        if (data.length > 0) return this.setState({ cards: data });
        this.setState({ cards: false })
      }
      if (this.state.cards === prevState.cards   && productByName === '') {
        debugger
         const { data } = await cardService.getCards();
         if (data.length > 0) return this.setState({ cards: data });
      }

    }


  async addCard(card){
    if (!this.props.user) {
      return this.setButtonSigIn(true)
    }
    this.props.addProduct(card)
  };



render(){
  const { cards } = this.state;
  const { buttonSigIn } = this.state;

  return (
    <>
     <Popup trigger={buttonSigIn} closePopup={this.setButtonSigIn}><Signin/></Popup>
     <div className="m-0">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774046892.jpg" className="d-block w-100" alt="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774046892.jpg"/>
              </div>
              <div className="carousel-item">
                <img src="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774046941.jpg" className="d-block w-100" alt="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774046941.jpg"/>
              </div>
              <div className="carousel-item">
                <img src="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774054821.jpg" className="d-block w-100" alt="https://storage.googleapis.com/sp-public/retailers/1193/homePage/1539774054821.jpg"/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
      </div>
      <div className="container">
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
        <div className="row pb-5">
          {cards.length > 0 &&cards.map(card => <Card key={card._id} card={card}  addCard={this.addCard}/>)}
        </div>
      </div>
    </>
  );
};
};

export default Home;
