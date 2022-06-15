import { React } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from 'jquery'; 


const NavbarSide = ({user,cards,changeNavigation,searchByName ,searchInput,setSearchInput}) => {

    const getValueAndSearchProducts=(e)=>{
        setSearchInput(e.target.value);
        searchByName(e.target.value)
      }
      const openNav=()=> {
        $('.App').addClass('transitionAndWidthBody');
        $('footer').addClass('transitionAndWidthBody');
        $(".navbar-toggler").addClass('d-none');
        $("#menu_user").addClass('transitionAndWidthSideNav');
      }
      
      const closeNav=()=> {
        $(".style_menu_user").removeClass('transitionAndWidthSideNav');
        $("footer").removeClass('transitionAndWidthBody');
        $('.App').removeClass('transitionAndWidthBody');
        $(".navbar-toggler").removeClass('d-none');
      }

      return(
        <>
            <h3 className="name_user">{user.id}</h3>
            <div className="form-inline d-flex" style={{"width":"60%" ,"margin":"auto"}}>
              <input value={searchInput} onChange={(e)=>{getValueAndSearchProducts(e)}} className="form-control  input-search" placeholder="Search"/>
              <button onClick={()=>{searchByName(searchInput)}} className="btn  my-2 my-sm-0 search "><i className="bi bi-search"></i></button>
            </div>
              <span className="fst-italic pe-5">Hello {user.name}</span>

                <NavLink to="/myProducts" onClick={()=>changeNavigation("myProducts")} className="nav-link text-light d-flex">
                            <i className="bi bi-cart text-danger"></i>
                            <span className="numberProducts">{cards}</span>
                </NavLink>
            <button className="navbar-toggler d-block" onClick={openNav} type="button" ><i className="bi bi-gear-fill"></i></button>
            <div id="menu_user" className="style_menu_user ">
            <button  className="closebtn" onClick={closeNav}>&times;</button>
                <ul className="navbarSide text-start navbar-nav ms-auto mb-2 mb-sm-0 d-flex flex-column">
                   <Link className="link-dark" to='userOrder'><li style={{fontSize:"25px"}} className="nav-item ps-4 p-3"><i className="bi bi-box-seam"></i> My orders</li></Link>
                   <Link className="link-dark" to='userProfile'><li style={{fontSize:"25px"}} className="nav-item ps-4 p-3"><i  className="bi bi-person"></i> Profile</li></Link>
                   {user.access==='manager'?(
                    <>
                    <Link className="link-dark" to='userDatabase'><li style={{fontSize:"25px"}} className="nav-item ps-4 p-3"><i className="bi bi-table"></i> userDatabase</li></Link>
                    <Link className="link-dark" to='addProducts'><li style={{fontSize:"25px"}}  className="nav-item ps-4 p-3"><i className="bi bi-credit-card-fill"></i> Products</li></Link>
                    </>
                   ):(
                    ''
                   )}
                   <Link className="link-dark" to='logout'><li style={{fontSize:"25px"}} className="nav-item ps-4 p-3"><i className="bi bi-box-arrow-left"></i> Sign Out</li></Link>
                </ul>
            </div>
        </>
      );
};

export default NavbarSide;
