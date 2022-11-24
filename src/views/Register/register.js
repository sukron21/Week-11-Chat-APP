import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    if (form.username === "" || form.password === "") {
      alert("Data tidak boleh kosong");
    } else {
      const body = {
        username: form.username,
        email: form.email,
        password: form.password,
      };

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
        .then((res) => {
          console.log(res.data);
          alert("Register Succes");
          return navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
     <form className="" onSubmit={(e) => onSubmitHandler(e)}>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#E5E5E5", justifyContent: "center" }}
      >
        <div
          className="padd"
          style={{
            paddingTop: "100px",
            paddingLeft: "400px",
            paddingBottom: "100px",
          }}
        >
          <div
            className="card"
            style={{ width: "25rem", borderRadius: "10px" }}
          >
            <div className="card-body" style={{ padding: "50px" }}>
              <div className="register">
                <div className="row">
                  <div className="col-md-3 ">
                    <Link to="/">
                      <img src={require("../../assets/back.png")} alt="" />
                    </Link>
                  </div>
                  <div className="col-md-6 justify-content-right">
                    <h3 style={{ color: "#7E98DF" }}>Register</h3>
                  </div>
                  <p>Let's create your account!</p>
                  <p style={{ fontSize: "12px", color: "#848484" }}>Name</p>
                  <input
                    type="text"
                    placeholder="Telegram App"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                    onChange={(e) => setForm({...form,username: e.target.value})}
                  ></input>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#848484",
                      paddingTop: "20px",
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
                    onChange={(e) => setForm({...form,email: e.target.value})}
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
                    onChange={(e) => setForm({...form,password: e.target.value})}
                  ></input>
                  <button
                    type="submit"
                    style={{
                      borderRadius: "15px",
                      marginTop: "30px",
                      height: "40px",
                      backgroundColor: "#7E98DF",
                      border: "none",
                      color: "#FFFFFF",
                    }}
                  >
                    Register
                  </button>
                  <div
                    className="Regis"
                    style={{ textAlign: "center", paddingTop: "20px" }}
                  >
                    <p style={{ fontSize: "13px" }}>Register With</p>
                  </div>
                  <button
                    type="submit"
                    style={{
                      borderRadius: "15px",
                      marginTop: "10px",
                      height: "40px",
                      backgroundColor: "#FFFFFF",
                      borderColor: "#7E98DF",
                      color: "#7E98DF",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};
export default Register;
