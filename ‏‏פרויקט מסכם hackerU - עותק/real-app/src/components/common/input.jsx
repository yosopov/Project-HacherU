
import { React,useState } from "react";

const Input = ({label,name,placeholder,value,flag,error, ...rest})=>{
   const [flagEditFunk, setFlagEditFunk] = useState(true);
    const makeEditingAvailable=(name)=>{
        let input = document.getElementById(name);
        if (flagEditFunk) {
            setFlagEditFunk(false);
            return input.disabled=false;
        }
         input.disabled=true;
         setFlagEditFunk(true);
    };
    
    return (
        <div>
        {flag?(
            <div className="input-group mb-3">
                    {flagEditFunk?(
                        <button onClick={(e)=>{makeEditingAvailable(e.currentTarget.name)}} name={name}  className="btn btn-primary" type="button" id="button-addon1">
                            <i className="bi bi-pencil-fill"></i>
                        </button>
                    ):(
                        <button onClick={(e)=>{makeEditingAvailable(e.currentTarget.name)}} name={name}  className="btn btn-primary" type="button" id="button-addon1">
                            close
                        </button>
                    )}
                <input className="form-control" disabled {...rest} id={name} name={name} value={value}/>
                {error && <span style={{width:"-webkit-fill-available"}} className="text-danger">{error}</span>}
            </div>
            ):(
                <div className="form-group">
                    <label htmlFor={name}>{label}:</label>
                    <input {...rest} id={name} name={name} placeholder={placeholder}className="form-control"/>
                    {error && <span className="text-danger">{error}</span>}
                </div>
                )}
    </div>);
};
export default Input;
