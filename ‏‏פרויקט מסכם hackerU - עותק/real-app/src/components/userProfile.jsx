import Form from "./common/form";
import usersService from "../services/userService";
import creditService from "../services/creditService";
import Joi from "joi";
import Popup from "./common/popup";
import PasswordAuthentication from "./common/passwordAuthentication";
import {toast} from "react-toastify";


class UserProfile extends Form {
    constructor(props) {
        super(props);
        this.state = {
            fullUser:null,
            form: null,
            credit: null,
            authentication:false,
        };
    this.setAuthentication = this.setAuthentication.bind(this);

    };

     async  componentDidMount(){
        const user = await (await usersService.getMe()).data
        this.setState({
            fullUser: user,
            form: {
              name:user.name,
              email:user.email,
              password:'**********',
              phone:user.phone
            }
        });
        this.setState({
          credit: await (await creditService.getMyCredit()).data[0]
        });
      };

    schema = {
        email: Joi.string().required().email({ tlds: { allow: false } }),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(2),
        phone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
      };

      async doSubmit() {
        let {form} = this.state;
        
        if (form.password === "**********" && form.password!==this.state.fullUser.password) {
          form.password = this.state.fullUser.password;
        };
        const body = {...form};
          let user = await (await usersService.updateUser(body)).data;
          if (!user) {
            form.password="**********";
            this.setState({form:form});
            return toast("Email to use",{className:'alert alert-warning'});
          };

          toast("the update has been performed",{className:'alert alert-success'});
          this.props.changeFullUser(user)
          user.password = "**********";
          this.setState({form:user});  
      };

      RequestForDeleteCard(){
        this.setState({
          authentication:true
        });
      };
      async setAuthentication(answer,password){
       if (!answer) {
        return this.setState({
          authentication:false
        });
       }
        let creditFlag = await ((await creditService.deleteCredit(password)).data)
        if (!creditFlag) {
         return toast("Incorrect password entered",{className:'alert alert-warning'});
        };
        toast("Credit successfully deleted",{className:'alert alert-success'})
        this.setState({
          credit:null,
          authentication:false
        });
      };

    render() { 
        const {fullUser} =this.state
        const {credit} =this.state
        const {authentication} =this.state
        return ( <>
        <Popup trigger={authentication} closePopup={this.setAuthentication}>
          <PasswordAuthentication deleteCredit={this.setAuthentication}/>
        </Popup>
        {fullUser?(

        <div className="p-5 pt-3">
          <h2>Your Profile</h2>
        <div style={{backgroundColor:"#20996ea3"}} className="p-absolute mt-3 p-5  top-50 start-50 border border-dark rounded">
          <div className="text-start fst-italic">
            <span className="fs-6 text-warning">Remember </span>:
            <span style={{fontSize:'12px'}}>The update is regular.
             Yow will not be able to restore the status quo ante.</span>
          </div>
        <div className="row">
          <div className="col-12">
            <p className="fw-bold">Profile update</p>
          </div>
        </div>
        
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "email", label: "Email", type: "email" ,placeholder:fullUser.email ,flag:true})}
          {this.renderInput({name: "password",label: "Password",type: "password" ,flag:true})}
          {this.renderInput({ name: "name", label: "Name" ,placeholder:fullUser.name ,flag:true})}
          {this.renderInput({ name: "phone", label: "phone" ,placeholder:fullUser.phone ,flag:true})}
          {credit?(
            <>
            <h3 className="ms-4 text-start">your Credit Card</h3>
              <div className="card credit text-warning bg-success mb-3">
                            <h4 className="card-header text-black text-end"><span onClick={()=>{this.RequestForDeleteCard()}}>&times;</span></h4>
                            <div className="card-body">
                              <h5 className="card-title">xxxx-xxxx-xxxx-xxxx</h5>
                              <h5 className="card-title">{credit.creditDate}</h5>
                              <h5 className="card-title">xxx</h5>
                            </div>
                    </div>

            </>
          ):(
            ''
          )}
          <div className="my-2">{this.renderButton("Update")}</div>
        </form>

        </div>
        </div>
        ):(
          ''
        )}
        </> );
    }
}
 
export default UserProfile;