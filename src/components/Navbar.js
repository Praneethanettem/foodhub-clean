import { Link } from "react-router-dom";

function Navbar({
  search,
  setSearch,
  setShowLogin
}) {

  const userEmail = localStorage.getItem("userEmail");

  return (

    <div className="navbar">

      {/* LOGO */}

      <div className="nav-logo">

        🍔 FoodHub

      </div>


      {/* SEARCH */}

      <div className="nav-search">

        <input
          type="text"
          placeholder="Search delicious food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* RIGHT SIDE */}

      <div className="nav-icons">

        {/* LOGIN BUTTON */}

        {!userEmail ? (

          <button
            className="nav-login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        ) : (

          <Link to="/profile" className="profile-user">

            👤 {userEmail.split("@")[0]}

          </Link>

        )}


        {/* CART */}

        <Link to="/cart">
          🛒
        </Link>

      </div>

    </div>

  );

}

export default Navbar;