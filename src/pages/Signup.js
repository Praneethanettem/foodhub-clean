import axios from "axios";

import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSignup = async () => {

    try {

      const response = await axios.post(

        "hhttp://127.0.0.1:7000/signup",

        {

          name: name,

          email: email,

          password: password

        }

      );

      console.log(response.data);

      alert(response.data);

      if(response.data === "Signup Successful") {

        navigate("/");

      }

    }

    catch(error) {

      console.log(error);

      alert("Signup Failed ❌");

    }

  };


  return (

    <div className="login-page">

      <div className="login-container">


        {/* LEFT SIDE */}

        <div className="left-side">

          <span className="float1">🍕</span>

          <span className="float2">🥤</span>

          <span className="float3">🍟</span>

          <div className="main-burger">

            🍔

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="right-side">

          <h1 className="signup-heading">

            Create Account

          </h1>

          <p>

            Signup to continue

          </p>


          <div className="login-form">

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <button
              className="signup-btn"
              onClick={() => {

                handleSignup();

              }}
            >

              Signup

            </button>


            <p className="login-text">

              Already have an account?{" "}

              <Link to="/login">

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Signup;