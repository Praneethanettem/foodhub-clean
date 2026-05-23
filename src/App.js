import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

import Dashboard from "./admin/Dashboard";
import AddFood from "./admin/AddFood";
import "./App.css";
import Orders from "./admin/Orders";

import Users from "./admin/Users";
import Login from "./pages/Login";
import AdminLogin from "./admin/AdminLogin";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={<Dashboard />} />

<Route path="/addfood" element={<AddFood />} />

<Route path="/orders" element={<Orders />} />

<Route path="/users" element={<Users />} />
<Route path="/signup" element={<Signup />} />

<Route path="/login" element={<Login />} />
<Route path="/admin" element={<AdminLogin/>}/>


      </Routes>

    </BrowserRouter>

  );

}

export default App;