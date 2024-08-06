import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { useContext, useEffect } from "react";
import { UpdateContext } from "./context";
import Login from "./pages/auth/login";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const socket = io("http://localhost:4080", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
function App() {
  const { isLoggedIn, setSocketId, socketId } = useContext(UpdateContext);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id, "socket data");
      setSocketId(socket.id);
      axios
        .post("http://localhost:4080/user/check-session", {
          socketId: socketId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    });
    socket.on("notif", (data) => {
      console.log(data);
      toast(data.data);
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const isPublicRoute =
              route.path === "/signup" ||
              route.path === "/login" ||
              route.path === "/reset-password";
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn || isPublicRoute ? route.element : <Login />
                }
              />
            );
          })}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
