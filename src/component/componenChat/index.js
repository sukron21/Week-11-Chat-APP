import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Image from "../../assets/Rectangle 8.png";

const Chat = () => {
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

  return (
    <>
      <h1>Halaman Chat {login && login.username} </h1>

      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", width: "80%" }}>
            <div
              style={{
                width: "20%",
                marginRight: "10px",
                overflow: "scroll",
                border: "1px",
              }}
            >
              {listuser.map((item, index) =>
                item.id !== login.id ? (
                  <div key={index}>
                    <button
                      onClick={() => selectReceiver(item)}
                      style={{
                        border: "none",
                        width: "100%",
                        height: "30px",
                        marginBottom: "4px",
                      }}
                      type="button"
                    >
                      {item.username}
                    </button>
                  </div>
                ) : null
              )}
            </div>
            <div className="container">
              <div
                style={{
                  width: "80%",
                  height: "400px",
                  overflow: "scroll",
                  border: "1px solid #ccc",
                  backgroundColor: "#FAFAFA",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#232323",
                    fontSize: "14px",
                  }}
                >
                  <div className="d-flex flex">
                    <img
                      src={require("../../assets/Rectangle 8.png")}
                      style={{ width: "70px", padding: "15px" }}
                      alt=""
                    />
                    <div className="name" style={{ marginTop: "10px" }}>
                      {activeReceiver.username}
                      <div
                        className="status"
                        style={{ color: "#7E98DF", fontSize: "12px" }}
                      >
                        online
                      </div>
                    </div>
                    <div
                      className="image"
                      style={{ marginTop: "20px", marginLeft: "400px" }}
                    >
                      <img
                        src={require("../../assets/Profile menu.png")}
                        style={{ width: "10px", height: "10px" }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {listchat.map((item, index) => (
                  <div key={index}>
                    {item.sender === login.username ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                            backgroundColor: "white",
                            color: "black",
                            marginTop: "5px",
                            borderRadius: "20px  15px 5px 15px  ",
                            maxWidth: "50%",
                          }}
                        >
                          {item.message}
                        </div>
                        <img
                          src={require("../../assets/Rectangle 8.png")}
                          style={{ width: "70px", padding: "15px" }}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="d-flex" style={{ padding: "20px" }}>
                        <img
                          src={require("../../assets/Rectangle 8.png")}
                          style={{ width: "70px", padding: "15px" }}
                          alt=""
                        />
                        <div
                          style={{
                            // display: 'flex',
                            justifyContent: "flex-start",
                            backgroundColor: "#7E98DF",
                            marginLeft: "10px",
                            height: "max-content",
                            borderRadius: "15px 20px 15px 5px",
                            marginTop: "20px",
                            padding: "20px",
                            // maxWidth:'50%',
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.message}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className='input' style={{}}> */}
          <form onSubmit={onSubmitMessage}>
            <input
              placeholder="Type your message"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              style={{ width: "87%", height: "40px" }}
            />
            <button style={{ height: "40px", width: "100px" }} type="submit">
              Send
            </button>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Chat;
