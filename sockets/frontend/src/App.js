import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
function App() {
  const [messages, setMessages] = useState();
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("receivedOtp", (data) => {
      console.log(data);
      setMessages(data.otp);
    });
  },[socket]);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("event", {
      msg: e.target[0].value,
    });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="message"></input>
        <br />
        <br />
        <input type="submit"></input>
      </form>
        {messages}
      <button></button>
    </div>
  );
}

export default App;
