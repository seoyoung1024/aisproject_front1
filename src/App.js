import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Login";
import Success from "./Success"; // 추가
import server from "./server";

function App() {
  const [a, aMag] = useState("로그인 하세요");
  const [b, aMag1] = useState("채팅을 하기위해서는 로그인을 해야합니다.");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (enteredId) => {
    if (enteredId.trim() === "") {
      setErrMsg("ID를 입력해주세요");
    } else {
      server.emit('login', enteredId)
      // 간단한 예제로 setTimeout 사용
      // setTimeout(() => {
        // 로그인 성공 시 상태 변경
        setLoggedIn(true);
        setId(enteredId);
      // }, 1000);
    }
  };

  const handleLogout = () => {
    // 로그아웃 시 상태 변경
    setLoggedIn(false);
    setId("");
    setErrMsg("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div className="loginb">
            <div className="Loginm">{a}</div>
            <div className="loginm">{b}</div>
            <Login errMsg={errMsg} click={handleLogin} />
          </div>
        </>
      ) : (
        <Success id={id} click={handleLogout} />
      )}
    </>
  );
}

export default App;

// function App() {
//   const [a, aMag] = useState("로그인 하세요");
//   const [b, aMag1] = useState("채팅을 하기위해서는 로그인을 해야합니다.");
//   const [Success, setSuccess] = useState(false);
//   const [id, setContents] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   function handleLogin(id) {
//     if (id === "") {
//       setErrMsg("ID를 입력해주세요");
//     } else {
//       function handleLogin(id) {
//         if (id === "") {
//           setErrMsg("ID를 입력해주세요");
//         } else {
//           setTimeout(() => {
//             // 로그인 성공 시 상태 변경
//             setSuccess(true);
//             setContents(enteredId);
//           }, 1000);
//         }
//       };
//         // });
//     }
//   }
//   function Logout() {
//     setSuccess(false);
//     setErrMsg("");
//   }

//   return (
//     <>
//       {!success ? (
//         <>
//         <div className='loginb'>
//           <div className='Loginm'>{a}</div>
//           <div className='loginm'>{b}</div>
//           <Login errMsg={errMsg} click={handleLogin} />
//           </div>
//         </>
//       ) : (
//         <Success id={id} Logout={Logout} />
//       )}
//     </>

//   );
// }

// export default App;
