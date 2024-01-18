import Button from "./button";
import { useRef } from "react";
import server from "./server";

function Login({ click, errMsg }) {
  const input_ref = useRef("");

  return (
    <>
      <div className="sed">
        <div>{errMsg}</div>
        <div>
          <input placeholder="  ID를 입력하세요." ref={input_ref}></input>
        </div>
        <Button className="Logb"
          color="rgb(43, 118, 224)"
          btn="LogIn"
          click={() => click(input_ref.current.value)}
        ></Button>
      </div>
    </>
  );
}

export default Login;
