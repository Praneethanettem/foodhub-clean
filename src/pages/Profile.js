import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
const [user,setUser] = useState({});
const [orders,setOrders] = useState([]);
const [editName,setEditName] = useState("");
const [editEmail,setEditEmail] = useState("");
const [showEdit,setShowEdit] = useState(false);
const [contactName, setContactName] = useState("");
const [contactEmail, setContactEmail] = useState("");
const [contactMessage, setContactMessage] = useState("");

useEffect(()=>{

  const email =
  localStorage.getItem("userEmail");

  axios.get(

    `http://127.0.0.1:7000/profile/${email}`

  )

  .then((response)=>{

    setUser(response.data);
    axios.get(

  `http://localhost:7000/userorders/${email}`

)

.then((response)=>{

  setOrders(response.data);

})

.catch((error)=>{

  console.log(error);

});
    
  setPhone(response.data.phone);

setLocation(response.data.location);

  })

  .catch((error)=>{

    console.log(error);

  });

},[]);  
const saveProfile = async () => {

  try{

    const response = await axios.put(

      `http://127.0.0.1:7000/updateprofile`,

      {
        oldEmail: user.email,
        name: editName,
        email: editEmail
      }

    );

    alert(response.data);

    setUser({

      ...user,
      name: editName,
      email: editEmail

    });

    localStorage.setItem(
      "userEmail",
      editEmail
    );
    setShowEdit(false);

  }

  catch(error){

    console.log(error);

    alert("Update Failed");
  }
};
const submitQuery = async () => {

  try {

    const response = await axios.post(

      "http://localhost:7000/contact",

      {

        name: contactName,

        email: contactEmail,

        message: contactMessage

      }

    );

    alert(response.data);

    setContactName("");

    setContactEmail("");

    setContactMessage("");

  }

  catch(error) {

    console.log(error);

    alert("Query Failed");

  }

};
  return (
    

    <div className="profile-container">
        {/* TOP WELCOME SECTION */}

<div className="profile-welcome">

  <div>

    <h1>
      Welcome Back, {user.name} 👋
    </h1>

    <p>
      Manage your account, track your orders and enjoy your favorite food.
    </p>

  </div>

</div>

      {/* LEFT PROFILE */}

      <div className="profile-left">

        <div className="profile-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

        
<h2>
  {user.name}
</h2>

<p>
  {user.email}
</p>

<h4>
  📍 Hyderabad, Telangana
</h4>

<div className="edit-profile-box">

  <button
    className="edit-btn"
    onClick={() => setShowEdit(!showEdit)}
  >

    Edit Profile

  </button>
  {showEdit && (
    <>
      <input
        type="text"
        placeholder="Change Name"
        value={editName}
        onChange={(e)=>setEditName(e.target.value)}
        className="edit-input"
      />

      <input
        type="email"
        placeholder="Change Email"
        value={editEmail}
        onChange={(e)=>setEditEmail(e.target.value)}
        className="edit-input"
      />

      <button
        className="save-btn"
        onClick={saveProfile}
      >

        Save Changes

      </button>

    </>

  )}

</div>
        </div>


        {/* WALLET */}
        <div className="wallet-card">
          <h2>
            💰 Wallet Balance
          </h2>
          <h1>{user.wallet}</h1>

        </div>
        {/* LOGOUT */}  
        <button
          className="logout-btn"
          onClick={() => {

            localStorage.clear();

            window.location.href="/";

          }}
        >

          Logout

        </button>

      </div>


      {/* RIGHT SIDE */}

      <div className="profile-right">

        {/* PAST ORDERS */}
{/* PAST ORDERS */}

<div className="orders-history">

  <div className="profile-top-text">

    <h1>
      Welcome Back, {user.name} 👋
    </h1>

    <p>
      Manage your account, track orders and enjoy delicious food.
    </p>

  </div>

  <h2>
    🍔 Past Orders
  </h2>

  {orders.map((order,index)=>(

    <div className="history-card" key={index}>

      <div>

        <h3>{order.item}</h3>

        <p>{order.amount}</p>

        <small>
          Ordered on: 22 May 2026 • 9:40 PM
        </small>

        <div className="rating-stars">
          ⭐⭐⭐⭐⭐
        </div>

      </div>


      <div className="order-right">

        <span>

          {order.status}

        </span>

        <button className="reorder-btn">

          Reorder

        </button>

      </div>

    </div>

  ))}

</div>


        {/* HELP SECTION */}
{/* HELP + EXTRA SECTION */}

<div className="help-extra-wrapper">

  {/* LEFT SIDE */}

  <div className="extra-profile-section">

    <div className="extra-card">

      <h2>🏠 Saved Address</h2>

      <p>
        Madhapur, Hyderabad, Telangana
      </p>

    </div>


    <div className="extra-card">

      <h2>❤️ Favorite Food</h2>

      <p>
        Chicken Burger, Oreo Shake, Pizza
      </p>

    </div>


    <div className="extra-card">

      <h2>⚡ Quick Actions</h2>

      <div className="quick-buttons">

        <button>
          Reorder
        </button>

        <button>
          Track Order
        </button>

      </div>

    </div>

  </div>


  {/* RIGHT SIDE */}

  <div className="help-section">

    <h2>
      📩 Help & Support
    </h2>

    <input
  type="text"
  placeholder="Your Name"
  value={contactName}
  onChange={(e)=>setContactName(e.target.value)}
/>
    <input
  type="email"
  placeholder="Your Email"
  value={contactEmail}
  onChange={(e)=>setContactEmail(e.target.value)}
/>
<textarea
  placeholder="Enter Your Query"
  value={contactMessage}
  onChange={(e)=>setContactMessage(e.target.value)}
/>
   <button onClick={submitQuery}>
  Submit Query
</button>

  </div>
</div>
      </div>

    </div>

  );

}
export default Profile;