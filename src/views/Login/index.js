import React, { useState} from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email:'',
    password:''
})

const onSubmit = (e)=>{
  if (e && e.preventDefault) { e.preventDefault(); }
    // console.log(form)

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,form)
    .then((response)  =>{
        // console.log(response.data.token.data)
        console.log(response.data)
        if(response.data.status !== 'success'){
          alert (response.data.message)
        }else{
        // localStorage.setItem("token", response.data.token.token);
        // localStorage.setItem("data",JSON.stringify(response.data.token.data));
        const result = response
        localStorage.setItem('user', JSON.stringify(result.data))
        alert("Berhasil Masuk")
        return navigate('/chatlist')}

    })
    .catch((err)=>{
        console.log(err);
    })
}

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#E5E5E5", justifyContent:'center',}}>
        <div className="padd" style={{paddingTop:'100px',paddingLeft:'400px', paddingBottom:'100px'}}>
        <div
          className="card"
          style={{ width: "25rem", borderRadius:"10px" }}
        >
          <div className="card-body" style={{ padding: "50px" }}>
            <div className="register">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                
                <div className="col-md-12" style={{textALign:'center'}}>
                  <h3 style={{ color: "#7E98DF", textAlign:'center' }}>Login</h3>
                </div>
                <p style={{fontSize:'14px', paddingTop:'20px'}}>Hi, Welcome back!</p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#848484",
                    // paddingTop: "20px",
                  }}
                >
                  Email
                </p>
                <input
                  type="text"
                  placeholder="telegram@gmail.com"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  onChange={(e)=> setForm({...form,email:e.target.value})}
                ></input>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#848484",
                    paddingTop: "20px",
                  }}
                >
                  Password
                </p>
                <input
                  type="password"
                  placeholder="****"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  onChange={(e)=> setForm({...form,password:e.target.value})}
                ></input>
                <p style={{color:'#7E98DF', fontSize:'12px', textAlign:'right', paddingTop:'30px'}}>Forgot password?</p>
                <button
                  type="submit"
                  style={{
                    borderRadius: "15px",
                    marginTop: "10px",
                    height: "40px",
                    backgroundColor: "#7E98DF",
                    border: "none",
                    color: "#FFFFFF",
                  }}
                >
                  Login
                </button>
                <div
                  className="Regis"
                  style={{ textAlign: "center", paddingTop: "20px" }}
                >
                  <p>Login With</p>
                </div>
                <button
                  type="submit"
                  style={{
                    borderRadius: "15px",
                    marginTop: "15px",
                    height: "40px",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#7E98DF",
                    color: "#7E98DF",
                  }}
                >
                  Google
                </button>
                <p style={{fontSize:'13px', textAlign:"center", paddingTop:'20px'}}>Don't have account?<Link to="/register">Sign Up</Link> </p>
                
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
