import { useState, useEffect } from "react";
import Cart from "./Cart";
import FoodCard from "../components/FoodCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import AuthModal from "../components/AuthModal";

function Home() {

  const [cart,setCart] = useState([]);

  const [selectedFood,setSelectedFood] = useState(null);

  const [search,setSearch] = useState("");

  const [filter,setFilter] = useState("all");

  const [showCart,setShowCart] = useState(false);

  const [showLogin,setShowLogin] = useState(false);
  const [dbFoods,setDbFoods] = useState([]);

  const foods = [

    {
      id:1,
      name:"Onion Dosa",
      price:90,
      rating:4.5,
      time:"25 mins",
      veg:true,
      offer:"20% OFF",
      image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800",
      desc:"Crispy dosa topped with onions and served with chutneys."
    },

    {
      id:2,
      name:"Idly",
      price:65,
      rating:4.4,
      time:"15 mins",
      veg:true,
      offer:"10% OFF",
      image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800",
      desc:"Soft steamed idly served with sambar and chutney."
    },

    {
      id:3,
      name:"Burger",
      price:149,
      rating:4.3,
      time:"20 mins",
      veg:false,
      image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
      desc:"Juicy chicken burger with cheese and crispy fries."
    },

    {
      id:4,
      name:"Pizza",
      price:299,
      rating:4.6,
      time:"30 mins",
      veg:false,
      offer:"25% OFF",
      image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
      desc:"Cheesy loaded pizza with spicy toppings."
    },

    {
      id:5,
      name:"Vada",
      price:70,
      rating:4.2,
      time:"10 mins",
      veg:true,
      image:"https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=800",
      desc:"Crispy medu vada served hot."
    },

    {
      id:6,
      name:"French Fries",
      price:120,
      rating:4.4,
      time:"15 mins",
      veg:true,
      image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800",
      desc:"Golden crispy french fries served with ketchup."
    },
{
  id:17,
  name:"Chocolate Ice Cream",
  price:140,
  rating:4.8,
  time:"10 mins",
  veg:true,
  category:"dessert",
  image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800",
  desc:"Creamy chocolate ice cream topped with choco chips."
},

{
  id:18,
  name:"Vanilla Sundae",
  price:160,
  rating:4.7,
  time:"12 mins",
  veg:true,
  category:"dessert",
  image:"https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800",
  desc:"Vanilla sundae with caramel toppings."
},

{
  id:19,
  name:"Brownie",
  price:180,
  rating:4.9,
  time:"15 mins",
  veg:true,
  category:"dessert",
  image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
  desc:"Hot chocolate brownie with ice cream."
},

{
  id:20,
  name:"Falooda",
  price:170,
  rating:4.6,
  time:"10 mins",
  veg:true,
  category:"dessert",
  image:"https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800",
  desc:"Refreshing royal falooda dessert."
},

{
  id:21,
  name:"Mango Milkshake",
  price:120,
  rating:4.5,
  time:"8 mins",
  veg:true,
  category:"drinks",
  image:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800",
  desc:"Fresh mango milkshake with cream."
},
{
  id:23,
  name:"Oreo Shake",
  price:160,
  rating:4.8,
  time:"10 mins",
  veg:true,
  category:"drinks",
  image:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800",
  desc:"Creamy oreo milkshake loaded with chocolate."
},

{
  id:24,
  name:"Strawberry Smoothie",
  price:150,
  rating:4.7,
  time:"8 mins",
  veg:true,
  category:"drinks",
  image:"https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=800",
  desc:"Fresh strawberry smoothie with chilled cream."
},

{
  id:25,
  name:"Fresh Lime Soda",
  price:90,
  rating:4.5,
  time:"5 mins",
  veg:true,
  category:"drinks",
  image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800",
  desc:"Refreshing lime soda perfect for summer."
},

{
  id:26,
  name:"Cold Coffee",
  price:120,
  rating:4.6,
  time:"7 mins",
  veg:true,
  category:"drinks",
  image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800",
  desc:"Iced cold coffee topped with cream."
},
{
  id:31,
  name:"Loaded Sandwich",
  price:190,
  rating:4.6,
  time:"12 mins",
  veg:true,
  category:"fastfood",
  image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800",
  desc:"Grilled loaded sandwich with cheese and veggies."
},

{
  id:32,
  name:"Chicken Wrap",
  price:240,
  rating:4.8,
  time:"15 mins",
  veg:false,
  category:"fastfood",
  image:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800",
  desc:"Spicy chicken wrap loaded with sauces and veggies."
},

{
  id:22,
  name:"Chicken Wings",
  price:260,
  rating:4.7,
  time:"20 mins",
  veg:false,
  category:"fastfood",
  image:"https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800",
  desc:"Spicy crispy chicken wings."
}
  ];
useEffect(() => {

  fetchFoods();

}, []);

const fetchFoods = async () => {

  try {

    const response = await axios.get(

      "http://localhost:7000/foods"

    );

    setDbFoods(response.data);

  }

  catch(error) {

    console.log(error);

  }

};
  const addToCart = (item) => {

    setCart([...cart,item]);

  };
  const allFoods = [

  ...foods,

  ...dbFoods

];

  const filteredFoods = allFoods.filter((item) => {

    const matchesSearch =
      item.name || item.foodname.toLowerCase().includes(search.toLowerCase());

    if(filter === "veg"){
      return item.veg && matchesSearch;
    }

    if(filter === "nonveg"){
      return !item.veg && matchesSearch;
    }

    if(filter === "offers"){
      return item.offer && matchesSearch;
    }

    if(filter === "rating"){
      return item.rating >= 4.5 && matchesSearch;
    }
    if(filter === "dessert"){
  return item.category === "dessert" && matchesSearch;
}

if(filter === "drinks"){
  return item.category === "drinks" && matchesSearch;
}

if(filter === "fastfood"){
  return item.category === "fastfood" && matchesSearch;
}

    return matchesSearch;

  });

  return (

    <div className="home-page">

      <Navbar
        search={search}
        setSearch={setSearch}
        setShowLogin={setShowLogin}
      />

      {/* HERO SECTION */}

      <div className="hero-section">

        <div className="hero-left">

          <h1>
            Delicious Food Delivered Fast 🍔
          </h1>

          <p>
            Experience Hyderabad’s favorite food with fresh ingredients and quick delivery.
          </p>

          <button>
            Order Now
          </button>

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
            alt=""
          />

        </div>

      </div>

      {!showCart && (

        <>

          {/* TOP BAR */}

          <div className="top-bar">

            <select className="location-select">

              <option>
                📍 Madhapur, Hyderabad
              </option>

              <option>
                📍 Kukatpally, Hyderabad
              </option>

              <option>
                📍 Gachibowli, Hyderabad
              </option>

              <option>
                📍 Ameerpet, Hyderabad
              </option>

            </select>

          </div>


          {/* FILTERS */}

          <div className="filters">

            <button onClick={() => setFilter("all")}>
              All
            </button>

            <button onClick={() => setFilter("veg")}>
              Veg
            </button>

            <button onClick={() => setFilter("nonveg")}>
              Non-Veg
            </button>

            <button onClick={() => setFilter("rating")}>
              Ratings 4+
            </button>

            <button onClick={() => setFilter("offers")}>
              Offers
            </button>
            <button onClick={() => setFilter("dessert")}>
  Desserts
</button>
<button onClick={() => setFilter("drinks")}>
  Drinks
</button>

<button onClick={() => setFilter("fastfood")}>
  Fast Food
</button>

          </div>


          {/* FOOD GRID */}

          <div className="food-grid">

            {filteredFoods.map((item) => (

              <div className="food-card" key={item.id}>

                <img
                  src={item.image}
                  alt=""
                  onClick={() => setSelectedFood(item)}
                />

                <div className="food-info">

                  <div className="food-top">

                    <span className={item.veg ? "veg-dot":"nonveg-dot"}></span>

                    <span className="best">
                      Bestseller
                    </span>

                  </div>

                 <h2>{item.name || item.foodname}</h2>

                  <p className="price">
                    ₹{item.price}
                  </p>

                  <p className="rating">
                    ⭐ {item.rating}
                  </p>

                  <p className="time">
                    🕒 {item.time}
                  </p>

                  {item.offer && (

                    <p className="offer-text">
                      {item.offer}
                    </p>

                  )}

                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                  >
                    ADD
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* FOOD POPUP */}

          {selectedFood && (

            <div
              className="popup-bg"
              onClick={() => setSelectedFood(null)}
            >

              <div className="popup">

                <img src={selectedFood.image} alt="" />

                <h2>{selectedFood.name || selectedFood.foodname}</h2>

              <p>{selectedFood.desc || selectedFood.category}</p>

              </div>

            </div>

          )}


          {/* CART BAR */}

          {cart.length > 0 && (

            <div className="cart-bar">

              <span>
                {cart.length} Item Added
              </span>

              <button onClick={() => setShowCart(true)}>
                View Cart ➜
              </button>

            </div>

          )}

        </>

      )}


      {/* CART PAGE */}

      {showCart && (

        <Cart
          cart={cart}
          setShowCart={setShowCart}
        />

      )}


      {/* LOGIN MODAL */}

      {showLogin && (

  <AuthModal
    closeModal={() => setShowLogin(false)}
  />

)}
{/* FOOTER */}

<div className="footer">

  <div className="footer-left">

    <h1>🍔 FoodHub</h1>

    <p>
      Delivering Hyderabad’s favorite food with taste, quality and fast service.
    </p>

  </div>


  <div className="footer-center">

    <h3>Quick Links</h3>

    <p>Home</p>
    <p>Cart</p>
    <p>Profile</p>
    <p>Orders</p>

  </div>


  <div className="footer-right">

    <h3>Contact</h3>

    <p>📍 Hyderabad, Telangana</p>

    <p>📞 +91 9876543210</p>

    <p>✉ foodhub@gmail.com</p>

  </div>

</div>
    </div>
    

  );

}

export default Home;