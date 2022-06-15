import React from "react";
import userService from "../services/userService"
class LogOut extends React.Component {
    componentDidMount(){
        userService.logout();
        window.location = "/"
    }
    render(){
        return null;
    };
};
 
export default LogOut;