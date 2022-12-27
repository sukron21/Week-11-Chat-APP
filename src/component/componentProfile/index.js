import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import setting from "../../assets/settinglagi.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const [listuser, setListUser] = useState([]);
  const [update, setUpdate] = useState({
    username: listuser.username,
    email: listuser.email,
    phone: listuser.phone,
  });
  const [login, setLogin] = useState({});
  const [isActive, setisActive] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLogin(user.data.data);
    const id = user.data.data.id;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
      .then((response) => {
        setListUser(response.data.data.rows);
        // console.log(response.data.data.rows)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    const form = {
      username: update.username,
      email: update.email,
      phone: update.phone,
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/user/${login.id}`, form)
      .then((res) => {
        console.log(res);
        alert("Update Success");
        return navigate("/chatlist");
      })
      .catch((err) => {
        console.log(err);
        alert("Update Failed");
      });
  };

  const deleteRow = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    // const id = data.data.data.id;
    axios
      .delete(`https://week-11-chat-api-production.up.railway.app/user/${login.id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Success");
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* {JSON.stringify(listuser)} */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 border-end ">
            {listuser.map((item, index) => (
              <div key={index}>
                
                  <div className="container ">
                    <div className="name">
                      <div
                        className="d-flex flex"
                        style={{ paddingTop: "20px" }}
                      >
                        <Link to="/chatlist">
                          <img
                            src={require("../../assets/back.png")}
                            style={{ width: "15px", height: "20px" }}
                            alt=""
                          />
                        </Link>
                        <h6
                          className="mx-auto"
                          style={{
                            paddingTop: "10px",
                            color: "#7E98DF",
                            //   paddingLeft: "110px",
                          }}
                        >
                          @{item.username}
                        </h6>
                      </div>
                    </div>
                    <div
                      className="pp"
                      style={{ justifyContent: "center", textAlign: "center" }}
                    >
                      <img
                        src={require("../../assets/pp.png")}
                        style={{ paddingTop: "30px" }}
                        alt=""
                      />
                      <h5 style={{ paddingTop: "20px" }}>Glorya McKinney</h5>
                      <h6
                        style={{
                          // paddingTop: "5px",
                          color: "#7E98DF",
                        }}
                      >
                        @{item.username}
                      </h6>
                    </div>
                    <div className="account" style={{ borderBottom: "1px" }}>
                      <h5>Account</h5>
                      <p></p>
                      <input
                        defaultValue={item.phone}
                        
                        style={{ border: "none" }}
                      />
                    </div>
                    <div className="but">
                      <button
                        type="submit"
                        style={{
                          border: "none",
                          color: "#7E98DF",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        Tap to change phone number
                      </button>
                    </div>
                    <hr />
                    <div className="user" style={{ paddingTop: "10px" }}>
                      <p>@{item.username}</p>
                      <p
                        style={{
                          color: "#848484",
                          marginTop: "-15px",
                          fontSize: "17px",
                        }}
                      >
                        username
                      </p>
                    </div>
                    <hr />
                    <div className="setting">
                      <p>
                        <b>I'm Senior Frontend Developer from Microsoft</b>
                      </p>
                      <p style={{ color: "#848484" }}>Bio</p>
                    </div>
                  </div>
              </div>
            ))}
            <button
              onClick={() => setisActive(!isActive)}
              style={{
                width: "100%",
                backgroundColor: "white",
                border: "none",
              }}
            >
              <div className="d-flex" style={{ paddingTop: "20px" }}>
                <img
                  src={require("../../assets/settinglagi.jpg")}
                  style={{ width: "45px" }}
                  alt=""
                />
                <h4 style={{ marginLeft: "25%", marginTop:'7px' }}>Setting</h4>
              </div>
            </button>
          </div>
          {isActive !== true ? (
            <></>
          ) : (
            <>
              <div
                className="col-md-9"
                style={{
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  backgroundColor: "#E5E5E5",
                  height:'100vh'
                }}
              >
                {listuser.map((item, index) => (
                  <div key={index} className="d-flex flex-column justify-content-center align-items center">
                  <form onSubmit={(e) => handlePost(e)}>
                <div
                  className=" d-flex flex-column justify-content-center align-items center"
                >
                  <span>Username</span>
                  <input defaultValue={item.username} style={{border:'none', borderRadius:'5px',height:'40px'}}
                  onChange={(e) =>
                    setUpdate({ ...update, username: e.target.value })
                  }/>
                  <span>email</span>
                  <input defaultValue={item.email} style={{border:'none', borderRadius:'5px',height:'40px'}}
                  onChange={(e) =>
                    setUpdate({ ...update, email: e.target.value })
                  }/>
                  <span>phone</span>
                  <input defaultValue={item.phone} style={{border:'none', borderRadius:'5px',height:'40px'}}
                  onChange={(e) =>
                    setUpdate({ ...update, phone: e.target.value })
                  }/>
                 <button style={{color:'white', marginTop:'20px', border:'none', borderRadius:'5px', backgroundColor:'orange', height:'40px'}} type="submit">Update</button>
                </div>
                </form>
                <button
                    onClick={(e) => deleteRow(e)}
                    style={{
                      border: "none",
                      backgroundColor: "#7E98DF",
                      color: "white",
                      borderRadius: "5px",
                      marginTop: "20px",
                      height: "40px",
                    }}
                  >
                    Delete Account
                  </button>
                  </div>
                ))}
                
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;
