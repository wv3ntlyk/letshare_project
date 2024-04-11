import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/login";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="/*" element={<Home></Home>}></Route>
    </Routes>
  );
};

export default App;
