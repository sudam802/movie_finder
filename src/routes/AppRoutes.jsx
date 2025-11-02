import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

import Login from "../pages/Login";
import Register from "../pages/register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
  
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
