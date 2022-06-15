import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi";
import withRouter from "./common/withRouter";
import usersService from "../services/userService";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

class SignUp extends Form{
  constructor(props){
    super(props)
    this.state = {
      form: {
        name: "",
        email: "",
        password: "",
        phone:""
      },
    };
  };

  schema = {
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2),
    phone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form,access:"client"};
    try {
      await usersService.createUser(body);
      toast("You are now registered");
      this.props.closePopup();
    } 
    catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      };
    };
  };

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/"/>;
    };
    return (
      <>
      <div className="m-5 p-3  border border-dark rounded bg-secondary">
        <PageHeader title="Sign Up with yizYos Shop"  />
        <div className="row">
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "email", label: "Email", type: "email" })}
          {this.renderInput({name: "password",label: "Password",type: "password"})}
          {this.renderInput({ name: "name", label: "Name" })}
          {this.renderInput({ name: "phone", label: "phone" })}
          <div className="my-2">{this.renderButton("Sign Up")}</div>
        </form>
      </div>
      </>
    );
  };
};

export default withRouter(SignUp);
