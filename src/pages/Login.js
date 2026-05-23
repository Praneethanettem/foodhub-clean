import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        "http://localhost:7000/login",

        {

          email,

          password

        }

      );

      if(response.data === "Login Successful"){

        localStorage.setItem(

          "userEmail",

          email

        );

        alert("Login Successful ✅");

        navigate("/");

      }

      else{

        alert(response.data);

      }

    }

    catch(error) {

      console.log(error);

      alert("Backend Error ❌");

    }

  };

  return (

    <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        background:"#f5f5f5"
      }}
    >

      <div
        style={{
          background:"white",
          padding:"40px",
          borderRadius:"15px",
          width:"350px"
        }}
      >

        <h1>

          Login

        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px"
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px",
            background:"orange",
            color:"white",
            border:"none"
          }}
        >

          Login

        </button>

      </div>

    </div>

  );

}

export default Login;