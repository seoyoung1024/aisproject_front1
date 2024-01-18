import "./App.css";

function Button({ color, fontSize, btn, click, msg }) {
  // const [a, s] = useState("aaa")
  return (
    <>
      <button
        onClick={() => click(msg)}
        style={{ backgroundColor: color, fontSize: fontSize}}
      >
        {btn}
      </button>
    </>
  );
}

export default Button;
//이게 없으면 자바에서는 프라이빗상태. 다른데에서 못씀 함수 옆에 써줄 수는 있지만 각 하나씩만 사용 가능해서,
//두 개의 함수를 쓸 때는 못 쓰므로 아래에 한번에 적용되게 쓰는 것임
