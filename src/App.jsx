import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import router from "./routes/Routes";
import { decodeToken } from "./utils/jwt";

const queryClient = new QueryClient();
const socket = io("http://localhost:8800");

function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setUserId(decoded?.id);
    }
    console.log(userId, "userId");

    socket.emit("join", userId);
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      if (message.receiverId === userId) {
        toast.info(`New message Arrived`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, userId]);

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
