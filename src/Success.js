import React, { useRef, useState, useEffect } from "react";
import "./Success.css";
import server from "./server";

function handleSendMessage() {
  // if (msg == "") {
  //   // setErrMsg("메세지를 입력해주세요");
  // } else {
  fetch("https://aischat-projectserver.onrender.com") //단방향일 때는 fetch를 씀
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // if(date.msg!=""){
      //   setSuccess(true);
      //   setContents(date.msg);
      // }else{
      //   setErrMsg("일치하는 id가 없습니다!")
      // }
    });
}
// }
function Success({ id, Logout }) {
  const inputRef = useRef("");
  const [chatMessage, setChatMessage] = useState(""); //사용자가 입력한 채팅 메세지를 저장하는 상태
  const [chatHistory, setChatHistory] = useState([]); //전체 채팅 내용을 저장하는 배열 상태
  const scroll_ref = useRef(0);

  const handleInputChange = (event) => {
    setChatMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() !== "") {
      //   fetch("http://localhost:3002/send/" +inputRef.current.value) //fetch는 버튼 누르는 곳에 넣어야됨
      //     .then((res) => res.json())
      //     .then((data) => {
      //       console.log(data);
      //       // if(date.msg!=""){
      //       //   setSuccess(true);
      //       //   setContents(date.msg);
      //       // }else{
      //       //   setErrMsg("일치하는 id가 없습니다!")
      //       // }
      //     });
      const newMessage = { level: "me", msg: chatMessage };
      setChatHistory([...chatHistory, newMessage]);

      setChatMessage(""); // 메시지 전송 후 입력값 초기화
      server.emit("send", chatMessage);
    }
  };

  useEffect(() => {
    if (scroll_ref.current) {
      scroll_ref.current.scrollTop = scroll_ref.current.scrollHight;
    }
    server.on("msg", (data) => {
      console.log(data);

      // let msg_array = [...chatHistory]
      const newMessage = data;
      setChatHistory([...chatHistory, newMessage]);

      // msg_array.push(data.msg)
      // setChatMessage(msg_array)
    });
  }, [chatHistory]);

  return (
    <>
      <div className="chbox">
        <div className="sen"></div>
        <div ref={scroll_ref} className="chat-history">
          {/* 채팅 내용을 매핑하여 화면에 표시 */}
          {chatHistory.map((message, index) => (
            <div
              className="msg_box"
              style={{
                justifyContent:
                  message.level == "sys"
                    ? "center"
                    : message.level == ""
                    ? "start"
                    : "end",
              }}
            >
              <div
                key={index}
                className={
                  message.level == "sys" ? "chat-messagecenter" : "chat-message"
                }
              >
                {message.msg}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input">
        <input
          className="ch"
          ref={inputRef}
          value={chatMessage}
          onChange={handleInputChange}
        />
        <button className="submit" onClick={handleSendMessage}>
          전송
        </button>
      </div>
    </>
  );
}

export default Success;
