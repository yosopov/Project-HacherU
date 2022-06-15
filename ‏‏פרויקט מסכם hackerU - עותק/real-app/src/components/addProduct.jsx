import Form from "./common/form";
import Joi from "joi";
import cardService from "../services/cardService";
import {toast} from "react-toastify";

class AddProduct extends Form {
    constructor(){
        super();
        this.state = {
          form:{
            productName:"",
            productPrice:"",
            productImage:"",
            attribution:"housewares",
            weight:'false'
          },

        };
    };

    changeSelect(value,variable){
        let body = this.state.form;
        if (variable==="weight") {
            body.weight = value;
           return this.setState({form:body});  
        };
        body.attribution = value;
        this.setState({form:body});
    };

    schema = {
        productName: Joi.string().required().min(2),
        productPrice: Joi.string().required().regex(/^[1-9]+\.\d{0,9}$/),
        productImage: Joi.string().required().min(6),
        attribution: Joi.string(),
        weight: Joi.string(),
    };


    async doSubmit() {
        let {form} = this.state;
        const body = {...form};
        const flag = await (await cardService.AddProduct(body)).data;
        if (!flag) {
            return toast("A product with the same name is already in the system",{className:'alert alert-warning'});
        }
        this.setState({
            form:{
                productName:"",
                productPrice:"",
                productImage:"",
                attribution:"housewares",
                weight:'false'
              }
        });
         toast("A new product is created",{className:'alert alert-sccess'});
      };

      render(){
        return(
            <div className="container pt-5">
                <div style={{backgroundColor:"#20996ea3"}} className="p-4">
                    <h3>Fill in the fields</h3>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    {this.renderInput({ name: "productName", label: "Product Name" })}
                    {this.renderInput({name: "productPrice",label: "Product Price",})}
                    {this.renderInput({ name: "productImage", label: "product image" })}
                    <label>attribution:</label>
                    <select onChange={(e)=>{this.changeSelect(e.target.value,'attribution')}} className="form-select  mt-2">
                        <option value="housewares">housewares</option>
                        <option value="PharmAndBabies">PharmAndBabies</option>
                        <option value="Cleanliness">Cleanliness</option>
                        <option value="SweetsAndSnacks">SweetsAndSnacks</option>
                        <option value="HealthAvdSpecialtyDiets">HealthAvdSpecialtyDiets</option>
                        <option value="BeveragesAndWine">BeveragesAndWine</option>
                        <option value="Frozen">Frozen</option>
                        <option value="DeliAndSalads">DeliAndSalads</option>
                        <option value="Grocery">Grocery</option>
                        <option value="CerealAndBreakfast">CerealAndBreakfast</option>
                        <option value="Meat">Meat</option>
                        <option value="Bakery">Bakery</option>
                        <option value="DairyAndEggs">DairyAndEggs</option>
                        <option value="FreshProduce">FreshProduce</option>
                    </select>
                    <label>weight:</label>
                    <select onChange={(e)=>{this.changeSelect(e.target.value,'weight')}} className="form-select mt-2">
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                    <div className="my-2">{this.renderButton("Add Product")}</div>

                    </form>
                </div>
              </div>
        );
      };

};
      export default AddProduct;
      