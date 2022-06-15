import  React  from "react";
import Card from "./card";
import cardService from "../services/cardService";
import userService from "../services/userService";
import {toast} from "react-toastify";
class userOrder extends React.Component  {
    constructor(){
        super()
        this.state={
            orders:[]
        };
    };

    async componentDidMount(){
        const { data } = await cardService.getMyorders();
        this.setState({ orders: data });
    }
    async endOrder(id){
        const orders = await userService.endOrder(id);
        this.setState({
            orders:orders.data
        });
        toast("Thank you for buying from us",{className:'alert alert-success'});

    };


    openOrder(orderName) {
        let x = document.getElementsByClassName("order");
        for (let i = 0; i < x.length; i++) {
            x[i].style.opacity = "0";
            x[i].style.display = "none"; 
        }
        let style = document.getElementById(orderName).style
        style.display = "block";
        setTimeout(() => {
            style.opacity = '1';
        });
      };

    render() {
        const {orders} = this.state;
        return(      
            <>
            {orders.length>0?(
            <>
             <div className="p-3 d-flex justify-content-around">
            {orders.length > 0 && orders.map(order=>{
                return(
                    <div key={order._id}>
                        <button className="btn btn-primary divActive" onClick={()=>{this.openOrder(order._id)}}>
                            {order.statusOrder}
                        </button>
                    </div>
                )  
            })}
             </div>  
            <div className="container">
                <div className="col-12">
             {orders.length>0 && orders.map(order=>{
            let orderPrice=0;
            return(
             <div key={order._id} className="order" id={order._id}>
                <div className="row">
                { order.cards.map(card=>{
                    orderPrice=orderPrice+Number(card.totalPrice)
                    return( <Card key={card._id} card={card} order={true}/>)
                })}
                    </div>
                    <h4>Order cost : {orderPrice.toFixed(2)}</h4>  
                    {order.statusOrder === 'shipping has arrived'?(
                            <button onClick={()=>{this.endOrder(order._id)}} className="btn btn-info">I received the shipment</button>
                        ):(
                            ''
                        )}
                </div>)

                
            })}
                </div>
             </div>
             </>
            ):(
            <h1>No order</h1>
            )}
            
           </>
        );


    };
};
export default userOrder;
