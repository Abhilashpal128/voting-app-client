import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Candidate from "./components/Candidate";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Toaster />
      {location.pathname === "/" || location.pathname === "/login" ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/candidate/:id" element={<Candidate />} />
      </Routes>

      {/* <Login /> */}
    </div>
  );
}

export default App;
