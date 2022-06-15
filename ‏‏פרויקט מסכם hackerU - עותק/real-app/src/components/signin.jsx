import withRouter from "./common/withRouter";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import usersService from "../services/userService";
import {Navigate} from "react-router-dom";

class SignIn extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
  };

  async doSubmit() {
    const { email, password } = this.state.form;
    try {
      await usersService.login(email, password);
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({
          errors: { email: response.data },
        });
      };
    };
  };

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/"/>
    };
    return (
      <>
      <div className="container mt-5  p-5 border border-dark rounded bg-secondary">
        <PageHeader title="Sign In to yizYos Shop" /> 
        <div className="row">
          <div className="col-12">
            <p>Sign in with your account</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "email", label: "Email", type: "email" })}
          {this.renderInput({name: "password",label: "Password",type: "password",})}
          <div className="my-2">{this.renderButton("Sign In")}</div>
        </form>
        </div>
      </>
    );
  };
};

export default withRouter(SignIn);
