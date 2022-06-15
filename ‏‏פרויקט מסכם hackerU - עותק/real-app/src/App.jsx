import  React from "react";
import {  Routes,Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import products from "./firstDataBase/products.json";
import usersService from "./services/userService";
import cardService from "./services/cardService";
import RegisterManager from "./components/registerManager";
import Home from "./components/home";
import UserProfile from "./components/userProfile";
import Footer from "./components/footer";
import Navbar from "./components/navbar"
import Signin from "./components/signin";
import Signup from "./components/signup";
import LogOut from "./components/logout";
import Navigation from "./components/navigation";
import MyProducts from "./components/myProducts";
import UserOrder from "./components/userOrder";
import UserDatabase from "./components/userDatabase";
import ProtectedRoute from "./components/common/protectedRoute";
import AddProduct from "./components/addProduct";
import './App.css';


class App extends React.Component  {
  constructor(){
    super()
    this.state = {
      flagManager:false,
      user: null,
      fullUser:null,
      cards:null,
      navigation:'',
      searchProductByName:''
    };
    this.addProduct = this.addProduct.bind(this);
    this.changeCards = this.changeCards.bind(this);
    this.changeFullUser = this.changeFullUser.bind(this);
  }


  async componentDidMount()  {

    const userManager = await usersService.findUsers()
    await cardService.createCard(products)
      if (userManager.data) {
        this.state.flagManager = true;
      }   
      this.setState({
        user:await usersService.getUser()
      });

     if (this.state.user ) {
       this.setState({
         fullUser: await (await usersService.getMe()).data
       });
     } 
    if (this.state.user) {
    this.setState({
        cards: this.state.fullUser.cards
    })
  }
  }
  async addProduct(card){
    const { data } = await cardService.AddCard(card);
    if (!data) {
      return toast("Too many products",{className:'alert alert-warning'})
    }
    this.setState({
      cards:data
    })
  }
  changeCards(cards){
    this.setState({cards:cards})
  }
  changeNavigation=(t)=>{
    this.setState({
      navigation : t
    })
  }
  changeFullUser=(value)=>{
    this.setState({
      fullUser:value
    })
  }
  changeFlag=()=>{
    this.setState({
      flagManager:true
    })
  }
  searchByName=(value)=>{
    this.setState({
      searchProductByName:value
    })
  }

  render(){
    const { flagManager } = this.state;
    const { user } = this.state;
    const { fullUser } = this.state;
    const { cards } = this.state
    const {navigation}= this.state
    const {searchProductByName} = this.state
    const pathname = window.document.location.pathname
  return (
    <div className="App">   
      {flagManager?(
        <>
        <ToastContainer/>
          <header style={{height:"10vh",blockSize:'auto'}}>
          {pathname !== '/signin' && pathname!== '/signup'?
          <Navbar user={fullUser} cards={cards?.length} searchByName={this.searchByName} changeNavigation={this.changeNavigation}/>
          :null}
            
          </header>
          <div>
        <main  style={{height:"100vh"}} className="flex-fill bg-success">
            <Routes >
              <Route path="/" element={<Home user={user} searchProductByName={searchProductByName} addProduct={this.addProduct}/>}/>
              <Route path="/signup" element={<ProtectedRoute user={user}><Signup/></ProtectedRoute>}/>
              <Route path="/signin" element={<ProtectedRoute user={user}><Signin/></ProtectedRoute>}/>
              <Route path="/logout" element={<LogOut />}/>
              <Route path="/myProducts" element={ <ProtectedRoute user={user}> <MyProducts cards={cards} changeCards={this.changeCards}/></ProtectedRoute>}/>
              <Route path="/userOrder" element={ <ProtectedRoute user={user}> <UserOrder/> </ProtectedRoute>}/>
              <Route path="/userProfile" element={ <ProtectedRoute user={user}> <UserProfile changeFullUser={this.changeFullUser}/> </ProtectedRoute>}/>
              <Route path="/userDatabase" element={ <ProtectedRoute user={fullUser} accessMnger> <UserDatabase/> </ProtectedRoute>}/>
              <Route path="/addProducts" element={ <ProtectedRoute user={fullUser} accessMnger> <AddProduct/> </ProtectedRoute>}/>
              <Route path={`/${navigation}`}  element={<Navigation user={user} searchProductByName={searchProductByName} addProduct={this.addProduct} navigation={navigation}/>}/>
              <Route path="*" element={  <ProtectedRoute spamUrl user={user}> <Home/></ProtectedRoute>}/>
            </Routes>
          </main>
          </div>
          <footer>
          <Footer/>
        </footer>
    </>
      ):(
         <RegisterManager changeFlag={this.changeFlag}/>
      )}
 
    </div>
  )
}
}

export default App;
