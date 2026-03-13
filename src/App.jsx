import { createContext, useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { getUsersInitialData, userReducer } from "./reducers/User";


export const UserContext = createContext();


function App() {
  const [count, setCount] = useState(0);

  const [userState, userDispatch] = useReducer(
    userReducer,
    getUsersInitialData(),
  );

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userState, userDispatch }}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
