import { React,useState } from "react";

const PasswordAuthentication = (props) => {
    const [password,setPassword]= useState('');
    return (
        <>
        <div className="container">
            <h5>Verify your ctrrent password</h5>
            <div>
            <span className="fs-6 text-warning">Remember </span>:
            <span style={{fontSize:'12px'}}>The update is regular.
             Yow will not be able to restore the status quo ante.</span>
             <div className="input-group flex-nowrap mt-3 mb-3">
                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-key-fill"></i></span>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" value={password} className="form-control" placeholder="password" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                <button onClick={()=>{props.deleteCredit(true,password)}} className='btn btn-danger'>delete</button>
            </div>
        </div>
        </>
    );
}

export default PasswordAuthentication;
