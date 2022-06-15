import React from 'react' ;
import usersService from "../services/userService";
import {toast} from "react-toastify";

class UserDarabase extends React.Component {
    constructor(){
        super()
        this.state = {
          users:null,

        };
      };
      async componentDidMount(){
        const {data} = await usersService.getAllUsers();
        this.setState({users:data});
      };
      
       setSelectOrder(e){
        this.setState({
            selectOrder:e.target.value
        });
      };
       setSelectAccess(e){
        this.setState({
            selectAccess:e.target.value
        });
      }
      async changeAccess(id,id_user){
        const value =  document.getElementById(id).value;
        const body = {
            value:value,
            idUser:id_user,
        };
        const users =  await usersService.changeAccess(body)
        toast("The Update has been preformed!!!",{className:'alert alert-success'});
        this.setState({
            users:users.data
        });
      };
      async changeOrder(id,id_user,id_order){
        const value =  document.getElementById(id).value;
        const body = {
            value:value,
            idUser:id_user,
            idOrder:id_order
        };
        const users =  await usersService.changeStatusOrder(body);
        toast("TheUpdate has been preformed!!!",{className:'alert alert-success'});
        this.setState({
            users:users.data
        });
      };


      render(){
          const {users} =this.state        
    return (
        <>
        {users?(
            <div className='p-5'>
                <h1 className='mb-3'>User table</h1>
            <table className="mb-5 table table-success table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">access</th>
                    <th scope="col">order</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((elemnt,index)=>{
                        return(
                            <tr key={elemnt._id}>
                                <th scope="row">{index+1}</th>
                                <td>{elemnt.name}</td>
                                <td>{elemnt.email}</td>
                                <td>{elemnt.phone}</td>
                                <td className=''>
                                        <span>{elemnt.access}</span>
                                        <div className='input-group mb-3'>
                                            <button  onClick={()=>{this.changeAccess(`${index}access`,elemnt._id)}} className="input-group-text"><i className="bi bi-pencil-square"></i></button>
                                            <select id={`${index}access`}  className="form-select form-control" aria-label="Default select example">           
                                                <option value="client">client</option>
                                                <option value="general">general</option>
                                                <option value="Senior">Senior</option>
                                                <option value="Vice Presidend">Vice Presidend</option>
                                            </select>
                                        </div>
                                </td>
                                <td>
                                    {elemnt.order.length>0?(
                                        elemnt.order.map(e=>{
                                            return(
                                                <div key={e._id}>
                                                    <span>{e.statusOrder}</span>
                                                <div className='input-group mb-3'  >
                                                <button onClick={()=>{this.changeOrder(`${index}order`,elemnt._id,e._id)}} className="input-group-text"><i className="bi bi-pencil-square"></i></button>
                                                <select id={`${index}order`}  className="form-select form-control" aria-label="Default select example">
                                                    <option value="Your order is being processed">Your order is being processed</option>
                                                    <option value="Collecting the products">Collecting the products</option>
                                                    <option value="Sending home">Sending home</option>
                                                    <option value="shipping has arrived">shipping has arrived</option>
                                                </select>
                                                </div>
                                                </div>
                                            );
                                        })
                                    ):(
                                        <h3>There are no open orders</h3>
                                    )};
                                </td>
                            </tr>
                        );
                    })};
                    
                </tbody>
                </table>
            </div>
        ):(
            ""
        )};
    </>
    );
};
}

export default UserDarabase;
