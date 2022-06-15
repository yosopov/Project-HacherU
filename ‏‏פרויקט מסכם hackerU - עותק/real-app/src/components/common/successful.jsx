import { Link } from "react-router-dom";

const Successful = ({message,button})=>{
    return (
        <div style={{backgroundColor:"#0c5e95"}} className="form-group m-5 p-5">
                <h4>{message}</h4>
                {button?(<Link to='/userOrder'><button className="btn mt-5 bg-primary ">{button}</button></Link>):("")}
                
        </div>
    );
};
export default Successful;
