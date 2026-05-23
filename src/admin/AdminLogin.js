import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [adminEmail, setAdminEmail] = useState("");

  const [adminPassword, setAdminPassword] = useState("");

  const navigate = useNavigate();



  const handleAdminLogin = () => {

    if(

      adminEmail === "admin@gmail.com"

      &&

      adminPassword === "admin123"

    ){

      alert("Admin Login Successful ✅");

      navigate("/dashboard");

    }

    else{

      alert("Invalid Admin Credentials ❌");

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

            👨‍💼

          </div>

        </div>



        {/* RIGHT SIDE */}

        <div className="right-side">

          <h1>

            Admin Login

          </h1>



          <p>

            Admin Access Only

          </p>



          <div className="login-form">



            <input

              type="email"

              placeholder="Enter Admin Email"

              value={adminEmail}

              onChange={(e)=>

                setAdminEmail(e.target.value)

              }

            />



            <input

              type="password"

              placeholder="Enter Password"

              value={adminPassword}

              onChange={(e)=>

                setAdminPassword(e.target.value)

              }

            />



            <button

              type="button"

              onClick={handleAdminLogin}

            >

              Admin Login

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;