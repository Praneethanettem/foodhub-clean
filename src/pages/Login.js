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

        "http://127.0.0.1:7000/login",

        {

          email,

          password

        }

      );

      console.log(response.data);

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
          width:"350px",
          boxShadow:"0px 0px 10px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            textAlign:"center"
          }}
        >

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
            marginTop:"20px",
            borderRadius:"8px",
            border:"1px solid gray"
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
            marginTop:"20px",
            borderRadius:"8px",
            border:"1px solid gray"
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
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            fontSize:"16px"
          }}
        >

          Login

        </button>

      </div>

    </div>

  );

}

export default Login;