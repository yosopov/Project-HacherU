import withRouter from "./common/withRouter";
import Form from "./common/form";
import Joi from "joi";
import creditService from "../services/creditService";
import {toast} from "react-toastify";
class AddCredit extends Form {
  state = {
    form: {
      creditNumber: "",
      creditDate: "",
      creditSecretNumber:"",
    },
  };

  schema = {
    creditNumber: Joi.string().length(16).pattern(/^[0-9]+$/).message("just numbers").required(),
    creditDate:Joi.date().min(Date()).required(),
    creditSecretNumber:Joi.string().length(3).pattern(/^[0-9]+$/).message("just numbers").required()
  };

  async doSubmit() {
    const {form} = this.state;
    try {
      await creditService.addCredit({form});
      toast("Card successfully associated");
      this.props.closePopup()
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.setState({
          errors: { email: response.data },
        });
      };
    };
  };
  

  render() {
    return (
      <>
      <div className="container mt-5  p-5 border border-dark rounded">
        <div className="row">
          <div className="col-12">
            <p>Add a credit card</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "creditNumber", label: "Credit Number",placeholder:"xxxx-xxxx-xxxx-xxxx", type: "text" })}
          {this.renderInput({name: "creditDate",label: "date",type: "date",})}
          {this.renderInput({name: "creditSecretNumber",label: "Credit Secret Number",placeholder:"xxx",type: "text",})}
          <div className="my-2">{this.renderButton("Sign In")}</div>
        </form>
        </div>
      </>
    );
  };
};

export default withRouter(AddCredit);
