
import { React,useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./common/popup";
import Signin from "./signin";
import Signup from "./signup";
import NavbarSide from "./navbarSide";
import cooking from "../icons/cooking.png";
import babyBottle from "../icons/baby-bottle.png";
import clean from "../icons/cleaning.png";
import leaf from "../icons/leaf.png";
import snack from "../icons/snack.png";
import wine from "../icons/wine.png";
import frozen from "../icons/frozen.png";
import cheese from "../icons/cheese.png";
import can from "../icons/can.png";
import cereal from "../icons/cereal.png";
import chickenLeg from "../icons/chicken-leg.png";
import bread from "../icons/bread.png";
import eggsAndMilk from "../icons/eggs-and-milk.png";
import healthyFood from "../icons/healthy-food.png";




const Navbar = ({ user,cards,changeNavigation,searchByName }) => {

  

  const [buttonSigIn,setButtonSigIn] = useState(false);
  const [buttonSigUn,setButtonSigUp] = useState(false);
  const [searchInput,setSearchInput] = useState('');


  const getValueAndSearchProducts=(e)=>{
    setSearchInput(e.target.value);
    searchByName(e.target.value);
  }




  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-light mt-0 bg-success shadow-sm "aria-label="Third navbar example">
      <div className={user?("container d-flex flex-nowrap"):("container d-flex")}>
        <Link to="/" className="navbar-brand">
            yizYos <i className="bi bi-shop text-danger"></i> Shop 
        </Link>
      {user?(
          <NavbarSide
           user={user}
           cards={cards}
           changeNavigation={changeNavigation}
           searchByName={searchByName}
           searchInput={searchInput}
           setSearchInput={setSearchInput}
           />
      ):(
        <>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="navbarsExample03">

            <div className="form-inline d-flex" style={{"width":"60%","margin":"auto"}}>
                  <input value={searchInput} onChange={(e)=>{getValueAndSearchProducts(e)}} className="form-control  input-search" placeholder="Search"/>
                  <button onClick={()=>{searchByName(searchInput)}} className="btn  my-2 my-sm-0 search "><i className="bi bi-search"></i></button>
            </div>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
              <>
                <li className="nav-item m-1">
                  <button onClick={()=>setButtonSigIn(true)} className="nav-link btn btn-primary">
                    Sign In 
                  </button>
                    <Popup trigger={buttonSigIn} closePopup={setButtonSigIn}>
                      <Signin></Signin>
                    </Popup>
                </li>
                <li className="nav-item m-1">
                <button onClick={()=>setButtonSigUp(true)} className="nav-link btn btn-primary">
                    Sign Up 
                  </button>
                    <Popup trigger={buttonSigUn} closePopup={setButtonSigUp}>
                      <Signup closePopup={setButtonSigUp}></Signup>
                    </Popup>
                </li>
              </>
          </ul>
      </div>
        </>
      )}
      </div>
    </nav>
          
          <div className="d-flex border-bottom bg-transparent">
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("housewares")} to="/housewares">
                    <span className="menu">Houseware & Leisure</span>
                    <img className="image-icons"  src={cooking} alt="Cooking"/>
                  </Link>
                  </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("PharmAndBabies")} to="/PharmAndBabies">
                    <span className="menu">Beauty & Baby</span>
                    <img className="image-icons" src={babyBottle} alt="baby-bottle"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("Cleanliness")} to="/Cleanliness">
                    <span className="menu">Cleaning</span>
                    <img className="image-icons" src={clean} alt="cleaning"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("SweetsAndSnacks")} to="/SweetsAndSnacks">
                    <span className="menu">Sweets & Snacks</span>
                    <img className="image-icons" src={leaf} alt="leaf"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("HealthAvdSpecialtyDiets")} to="/HealthAvdSpecialtyDiets">
                    <span className="menu">Health & Specialty Diets</span>
                    <img className="image-icons" src={snack} alt="snack"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("BeveragesAndWine")} to="/BeveragesAndWine">
                    <span className="menu">Beverages & Wine</span>
                    <img className="image-icons" src={wine} alt="wine"/>
                  </Link>
                </div>
               <div className="flex-fill border">
                 <Link className="link-dark" onClick={()=>changeNavigation("Frozen")} to="/Frozen">
                   <span className="menu">Frozen</span>
                   <img className="image-icons" src={frozen} alt="frozen"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("DeliAndSalads")} to="/DeliAndSalads">
                    <span className="menu">Deli & Salads</span>
                    <img className="image-icons" src={cheese} alt="cheese"/>
                  </Link>
                </div>
               <div className="flex-fill border">
                 <Link className="link-dark" onClick={()=>changeNavigation("Grocery")} to="/Grocery">
                   <span className="menu">Grocery</span>
                   <img className="image-icons" src={can} alt="can"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("CerealAndBreakfast")} to="/CerealAndBreakfast">
                    <span className="menu">Cereal & Breakfast</span>
                    <img className="image-icons" src={cereal} alt="cereal"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("Meat")} to="/Meat">
                    <span className="menu">Meat, Chicken & Fish</span>
                    <img className="image-icons" src={chickenLeg} alt="chicken-leg"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("Bakery")} to="/Bakery">
                    <span className="menu">Bakery</span>
                    <img className="image-icons" src={bread} alt="bread"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("DairyAndEggs")} to="/DairyAndEggs">
                    <span className="menu">Dairy & Eggs</span>
                    <img className="image-icons" src={eggsAndMilk} alt="eggs-and-milk"/>
                  </Link>
                </div>
                <div className="flex-fill border">
                  <Link className="link-dark" onClick={()=>changeNavigation("FreshProduce")} to="/FreshProduce">
                    <span className="menu">Fresh Produce</span>
                    <img className="image-icons" src={healthyFood} alt="healthy-food"/>
                  </Link>
                </div>
          </div>

    </div>
  );
};

export default Navbar;

