// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import GetUser from "./pages/getUser.jsx";
import CreateUser from "./pages/CreateUser.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get" element={<GetUser />} />
      <Route path="/post" element={<CreateUser />} />
    </Routes>
  );
}
