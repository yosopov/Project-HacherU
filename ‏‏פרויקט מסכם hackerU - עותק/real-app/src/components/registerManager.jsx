import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi";
import withRouter from "./common/withRouter";
import usersService from "../services/userService";
import {toast} from "react-toastify";
class RegisterManager extends Form{
  state = {
    form: {
      name: "",
      email: "",
      password: "",
      phone:"",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2),
    phone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form,access:"manager"};

    try {
      await usersService.createUser(body);
      toast("You are now registered");
      this.props.changeFlag();
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({ errors: { email: response.data } });
      };
    };
  };
  render() {
    return (
    <div className="bg-success">
    <h2 className="mt-5">Welcome , in the next few minutes you are going to become the webmaster.</h2>
      <div className="container mt-5  p-5 border border-dark rounded register-manager">
        <PageHeader title="Sign up login" />
        <div className="row">
          <div className="col-12">
            <p>Please make sure all fields are in correctly.</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "email", label: "Email", type: "email" })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
          })}
          {this.renderInput({ name: "name", label: "Name" })}
          {this.renderInput({ name: "phone", label: "phone" })}
          <div className="my-2">{this.renderButton("Sign Up")}</div>
        </form>
      </div>
      </div>
    );
  };
};

export default withRouter(RegisterManager);
