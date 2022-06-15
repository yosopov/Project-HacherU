import React from "react";
import { useState } from "react";

const Card = ({ card,addCard,deleteProduct,order}) => {

  const [numberProducts,SetNumberProducts] = useState(card.amount?(card.amount):(1));

  const checkProducts=(e)=>{
    debugger
    if (e.currentTarget.value < numberProducts) {
      const count =numberProducts-1
      return SetNumberProducts(count)
    }
    const count =numberProducts+1;
    SetNumberProducts(count)
  };

  const sendCard=()=>{
    addCard(
      {
        _id:card._id,
        productName:card.productName,
        productPrice:card.productPrice,
        productImage:card.productImage,
        amount:numberProducts,
        totalPrice:(card.productPrice*numberProducts).toFixed(2)
      });
      return SetNumberProducts(1);
  };

  return (
    <div  className="col-sm-12 col-md-6 col-xl-3 mt-3">
      <div style={{height:"100%"}} className="card border border-dark">
        <img
          className="p-2 m-auto img-thumbnail"
          src={card.productImage}
          alt={card.productName}
        />
        <div className="card-body ">
          <span className="mb-5">{card.productName}</span>
          <p className="card-text border-top align-left pt-4 pl-2 ">
              <strong>₪{(card.productPrice*numberProducts).toFixed(2)}{card.weight?(" / kl"):("")}</strong>
              {card.amount?(
               <span className="d-block">
                      {!order?(
                        <>
                          Quantity:<input style={{width: "40px"}} className="m-1 border-0"  type="number" name={card._id} onChange={(e)=>{checkProducts(e)}} value={numberProducts} min={1} max={99}/>
                          <button onClick={()=>{deleteProduct(card._id)}} className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                        </>
                      ):(
                        <>
                          <span>Quantity: {numberProducts}</span>
                        </>
                      )}         
               </span>
                ):(
                  <span>
                    <input style={{width: "40px"}} className="m-1"  type="number" name={card._id} onChange={(e)=>{checkProducts(e)}} value={numberProducts} min={1} max={99}/>
                    <button onClick={()=>{sendCard()}} > add <i className="bi bi-cart text-danger"/> </button>
                  </span>
              )}
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default Card;