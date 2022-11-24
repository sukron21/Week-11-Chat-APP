import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import styles from "../componentProfile/style.module.css";
import icPhone from "../../assets/icPhone.png";
import icNotif from "../../assets/icNotif.png";
import icSampah from "../../assets/icSampah.png";
import icSearch from "../../assets/Search.png";
import menu from "../../assets/Menu (1).png";
import icSetting from "../../assets/Settings.png";
import icContact from "../../assets/Contacts.png";
import icSaved from "../../assets/savemsg.png";
import icInvite from "../../assets/Invite friends.png";
import icFAQ from "../../assets/FAQ.png";
import search1 from "../../assets/Search (1).png";
import plus from "../../assets/Plus.png";
import ppuser from "../../assets/Rectangle 8.png";
import PP from "../../assets/Rectangle 8.png"

const Home = () => {
  const navigate=useNavigate();
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    // console.log()
    socket.on("send-message-response", (response) => {
      console.log(response);
      // set receiver
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
      }
    });
    setSocketIo(socket);
  }, []);

  const [message, setMessage] = useState();
  const onSubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));

    // list history saat submit message
    const payload = {
      sender: user.data.data.username,
      receiver: receiver.username,
      message,
    };

    setListchat([...listchat, payload]);

    const data = {
      sender: user.data.data.id,
      receiver: activeReceiver.id,
      message,
    };

    socketio.emit("send-message", data);

    setMessage("");
  };

  const [listuser, setListUser] = useState([]);
  const [login, setLogin] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLogin(user.data.data);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user`)
      .then((response) => {
        setListUser(response.data.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [activeReceiver, setActiveReceiver] = useState({});
  const selectReceiver = (item) => {
    //TAMBAHAN MERESET CHAT
    setListchat([]);

    setActiveReceiver(item);
    // console.log(item)
    // set RECEIVER
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login);

    const data = {
      sender: login.id,
      receiver: item.id,
    };

    socketio.emit("chat-history", data);
  };
  const logout = () => {
    localStorage.clear();
    alert("Berhasil Logout")
   return navigate("/");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-3 border-end "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="container ">
              <div className="name">
                <div className="d-flex flex-row py-3 ">
                  <div className={`col-auto me-auto ${styles.title}`}>
                    {" "}
                    Telegram{" "}
                  </div>
                  <div className="dropdown ">
                    <img
                      src={menu}
                      alt="menu"
                      className="col-auto"
                      type="button"
                      data-bs-toggle="dropdown"
                    />
                    <ul className={`dropdown-menu ${styles.dropStyle}`}>
                      <li>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to={`/profile`}
                        >
                          <img src={icSetting} alt="setting" className="me-4" />{" "}
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className={`dropdown-item ${styles.textMenu}`}
                          to="/hprofile"
                        >
                          <img src={icContact} alt="setting" className="me-4" />{" "}
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to="#"
                        >
                          <img src={icPhone} alt="setting" className="me-4" />{" "}
                          Calls
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to="#"
                        >
                          <img src={icSaved} alt="setting" className="me-4" />{" "}
                          Save message
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to="#"
                        >
                          <img src={icInvite} alt="setting" className="me-4" />{" "}
                          Invite Friends
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to="#"
                        >
                          <img src={icFAQ} alt="setting" className="me-4" />
                          Telegram FAQ
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout} style={{border:'none',backgroundColor:'#7E98DF'}}>
                        <Link
                          className={`dropdown-item ${styles.textMenu}`}
                          to="/"
                        >
                          <i className="fa fa-search me-4" />
                          Logout
                        </Link>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="pp"
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  paddingTop: "50px",
                }}
              >
                <div className="d-flex" style={{ backgroundColor: "#FAFAFA" }}>
                  <div className="d-flex">
                    <img src={search1} alt="" />
                    <input
                      placeholder="Type your message..."
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#FAFAFA",
                      }}
                    ></input>
                  </div>
                  <button style={{ border: "none", backgroundColor: "white" }}>
                    <img src={plus} style={{ paddingLeft: "20px" }} alt="" />
                  </button>
                </div>
              </div>
              <div className="" style={{ paddingTop: "50px" }}>
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link active ${styles.navCustom}`}
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Important
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Unread
                    </button>
                  </li>
                </ul>
                <div style={{overflow: "scroll", height:'60vh'}}>
                {listuser.map((item, index) =>
                  item.id !== login.id ? (
                    <div key={index} style={{ height:'6  0vh'}}>
                      <button onClick={() => selectReceiver(item)} 
                        style={{ border: "none", backgroundColor: "white" }}
                      >
                        <div className="row">
                            <div className="col-md-4">
                            <div className="d-flex">
                            <img src={PP} alt="setting" className="me-4" />
                            <div>
                            <p><b>{item.username}</b></p>
                            <p>Chat</p>
                            </div>
                            </div>
                            </div>
                            
                        </div>
                      </button>
                      <hr/>
                    </div>
                    
                  ) : null
                )}
              </div>
            </div>
          </div>
          </div>
          <div
            className="col-md-9"
            style={{ paddingTop: "20px", paddingLeft: "20px" }}
          >
            <div className="d-flex flex-row px-5">
              <img
                src={require("../../assets/Rectangle 8.png")}
                //   style={{ paddingTop: "30px" }}
                alt=""
              />
              <div
                className=" d-flex flex-column justify-content-end me-auto"
                style={{ paddingLeft: "30px" }}
              >
                <p>
                  <b> {activeReceiver.username}</b>
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
            <div style={{ overflow: "scroll", height: "75vh" }}>
            {
              listchat.map((item, index) => (
                <div key={index}>
                  {
                    item.sender === login.username ? (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <div style={{
                          padding: '10px',
                          // backgroundColor: 'blue',
                          color: 'black',
                          marginTop:'5px',
                          borderRadius: '20px  15px 5px 15px  '
                          
                        }}>
                          <p>
                          {item.message}
                          </p>
                        </div>
                        <img src={require("../../assets/Rectangle 8.png")} style={{width:'70px', padding:'15px'}} alt="" />
                      </div>
                    ) : (
                      <div className='d-flex'>
                        <img src={require("../../assets/Rectangle 8.png")} style={{width:'70px', padding:'15px'}} alt="" />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        // backgroundColor:'#7E98DF',
                        marginLeft:'10px',
                        width:'200px',
                        height:'max-content',
                        borderRadius: '15px 20px 15px 5px',
                        marginTop:'20px',
                        maxWidth:'400px'
                      }}>
                        <p>
                        {item.message}
                        </p>
                      </div>
                      </div>
                    )
                  }
                  
                </div>
                
              ))
            }
           
            </div>
            <form
             onSubmit={onSubmitMessage}
            >
              <div style={{ position: "relative" }}>
                <input
                  placeholder="Type your message.. "
                  type="text"
                  onChange={(e) => setMessage(e.target.value)} value={message}
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
      </div>
    </>
  );
};
export default Home;
