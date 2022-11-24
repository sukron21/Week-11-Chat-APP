import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import icPhone from "../../assets/icPhone.png";
import icNotif from "../../assets/icNotif.png";
import icSampah from "../../assets/icSampah.png";
import icSearch from "../../assets/Search.png";

const Profile = () => {
  const navigate=useNavigate()
  const [listuser, setListUser] = useState([]);
  const [update, setUpdate] = useState({
    username: listuser.username,
    email: listuser.email,
    phone: listuser.phone,
  });
  const [login, setLogin] = useState({});
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    setLogin(user.data.data);
    const id =user.data.data.id
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
        return navigate('/chatlist');
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
      .delete(`http://localhost:3002/user/${login.id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Success");
        return navigate('/')
      })
      .catch((err) => {
        console.log(err);
      })
    }

  return (
    <>
      {/* {JSON.stringify(listuser)} */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 border-end ">
            {listuser.map((item, index) => (
              <div key={index}>
                <form onSubmit={(e) => handlePost(e)}>
                  <div className="container ">
                    <div className="name">
                      <div
                        className="d-flex flex"
                        style={{ paddingTop: "20px" }}
                      >
                        <Link to='/chatlist'>
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
                        onChange={(e) =>
                          setUpdate({ ...update, phone: e.target.value })
                        }
                        style={{ border: "none" }}
                      />
                    </div>
                    <div className="but">
                      <button type="submit"
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
                      <h4>Setting</h4>
                      <div className="d-flex" style={{ paddingTop: "20px" }}>
                        <img
                          src={require("../../assets/lonceng.png")}
                          
                          alt=""
                        />
                        <p style={{ paddingLeft: "30px" }}>
                          Notification and Sound
                        </p>
                      </div>
                      
                    </div>
                  </div>
                </form>
              </div>
            ))}
          </div>
          <div
            className="col-md-9"
            style={{ paddingTop: "20px", paddingLeft: "20px" }}
          >
            <div className="d-flex flex-row px-5">
              <img
                src={require("../../assets/Rectangle 8.png")}
                
                alt=""
              />
              <div
                className=" d-flex flex-column justify-content-end me-auto"
                style={{ paddingLeft: "30px" }}
              >
                <p>
                  <b>Mymother</b>
                </p>
                <p style={{ marginTop: "-10px", color: "#7E98DF" }}>Online</p>
              </div>
              <button
                className="mt-3"
                style={{ border: "none", backgroundColor: "white" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <img
                  className="  "
                  src={require("../../assets/Profile menu.png")}
                  style={{ width: "20px", height: "15px" }}
                  alt=""
                />
              </button>
              <div className="row">
                <div className=" d-flex justify-content-end pe-5">
                  <div
                    className={`collapse  ${styles.sideTopCollepse}`}
                    id="collapseExample"
                  >
                    <div
                      className={`card card-body ${styles.cstmCollepsetop} end-0`}
                    >
                      <ul className={`px-3 ${styles.collepseStyle}`}>
                        <li className="my-3">
                          <Link className={`p-0 ${styles.textTopmenu}`} to="#">
                            <img src={icPhone} alt="setting" className="me-3" />{" "}
                            Call{" "}
                          </Link>
                        </li>
                        <li className="my-3">
                          <Link className={`p-0 ${styles.textTopmenu}`} to="#">
                            <img
                              src={icSampah}
                              alt="setting"
                              className="me-4"
                            />{" "}
                            Delete chat history{" "}
                          </Link>
                        </li>
                        <li className="my-3">
                          <Link className={`p-0 ${styles.textTopmenu}`} to="#">
                            <img src={icNotif} alt="setting" className="me-4" />{" "}
                            Mute notification
                          </Link>
                        </li>
                        <li className="my-3">
                          <Link className={`p-0 ${styles.textTopmenu}`} to="#">
                            <img
                              src={icSearch}
                              alt="setting"
                              className="me-4"
                            />
                            Search
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ overflow: "scroll", height: "115vh" }}></div>
            <form
            //  onSubmit={onSubmitMessage}
            >
              <div style={{ position: "relative" }}>
                <input
                  placeholder="Type your message.. "
                  type="text"
                  // onChange={(e) => setMessage(e.target.value)} value={message}
                  style={{
                    width: "87%",
                    height: "7vh",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#FAFAFA",
                  }}
                />
                <button
                  style={{ height: "7vh", width: "100px", border: "none" }}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <button onClick={(e) => deleteRow( e)} style={{border:'none',backgroundColor:'#7E98DF', color:'white', borderRadius:'5px', marginLeft:'80px', marginTop:'20px', height:'30px' }}>
                          Delete Account
                        </button>
                        
      </div>
    </>
  );
};
export default Profile;
