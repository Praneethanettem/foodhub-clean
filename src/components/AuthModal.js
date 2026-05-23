import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AuthModal({ closeModal }) {

  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");

  const [adminPassword, setAdminPassword] = useState("");


  // USER LOGIN

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        "http://localhost:7000/login",

        {

          email,

          password

        }

      );

      alert(response.data);

      if(response.data === "Login Successful") {

        localStorage.setItem(

          "userEmail",

          email

        );

        closeModal();

      }

    }

    catch(error) {

      console.log(error);

      alert("Login Failed ❌");

    }

  };



  // USER SIGNUP

  const handleSignup = async () => {

    try {

      const response = await axios.post(

        "http://localhost:7000/signup",

        {

          name,

          email,

          password

        }

      );

      alert(response.data);

      if(response.data === "Signup Successful") {

        setMode("login");

      }

    }

    catch(error) {

      console.log(error);

      alert("Signup Failed ❌");

    }

  };



  return (

    <div className="modal-bg">

      <div className="auth-modal">


        {/* CLOSE BUTTON */}

        <button

          className="close-btn"

          onClick={closeModal}

        >

          ✖

        </button>



        {/* LEFT SIDE */}

        <div className="auth-left">

          <h1>

            🍔 FoodHub

          </h1>

          <p>

            Delicious food delivered fast

          </p>

        </div>



        {/* RIGHT SIDE */}

        <div className="auth-right">



          {/* USER LOGIN */}

          {mode === "login" && (

            <>

              <h2>User Login</h2>



              <input

                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e)=>

                  setEmail(e.target.value)

                }

              />



              <input

                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e)=>

                  setPassword(e.target.value)

                }

              />



              <button

                className="auth-btn"

                onClick={handleLogin}

              >

                Login

              </button>



              <p>

                Don't have account?{" "}

                <span

                  onClick={() =>

                    setMode("signup")

                  }

                  style={{

                    color:"orange",

                    cursor:"pointer",

                    fontWeight:"bold"

                  }}

                >

                  Signup

                </span>

              </p>



              <p>

                <span

                  onClick={() =>

                    setMode("admin")

                  }

                  style={{

                    color:"orange",

                    cursor:"pointer",

                    fontWeight:"bold"

                  }}

                >

                  Admin Login

                </span>

              </p>

            </>

          )}



          {/* USER SIGNUP */}

          {mode === "signup" && (

            <>

              <h2>Create Account</h2>



              <input

                type="text"

                placeholder="Enter Name"

                value={name}

                onChange={(e)=>

                  setName(e.target.value)

                }

              />



              <input

                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e)=>

                  setEmail(e.target.value)

                }

              />



              <input

                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e)=>

                  setPassword(e.target.value)

                }

              />



              <button

                className="auth-btn"

                onClick={handleSignup}

              >

                Signup

              </button>



              <p>

                Already have account?{" "}

                <span

                  onClick={() =>

                    setMode("login")

                  }

                  style={{

                    color:"orange",

                    cursor:"pointer",

                    fontWeight:"bold"

                  }}

                >

                  Login

                </span>

              </p>

            </>

          )}



          {/* ADMIN LOGIN */}

          {mode === "admin" && (

            <>

              <h2>

                Admin Login

              </h2>



              <input

                type="email"

                placeholder="Enter Admin Email"

                value={adminEmail}

                onChange={(e) =>

                  setAdminEmail(e.target.value)

                }

              />



              <input

                type="password"

                placeholder="Enter Password"

                value={adminPassword}

                onChange={(e) =>

                  setAdminPassword(e.target.value)

                }

              />



              <button

                className="auth-btn"

                onClick={() => {

                  if(

                    adminEmail === "admin@gmail.com"

                    &&

                    adminPassword === "admin123"

                  ){

                    alert("Admin Login Successful ✅");

                    closeModal();

                    navigate("/dashboard");

                  }

                  else{

                    alert("Invalid Admin Credentials ❌");

                  }

                }}

              >

                Admin Login

              </button>



              <p>

                Back To{" "}

                <span

                  onClick={() =>

                    setMode("login")

                  }

                  style={{

                    color:"orange",

                    cursor:"pointer",

                    fontWeight:"bold"

                  }}

                >

                  User Login

                </span>

              </p>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default AuthModal;