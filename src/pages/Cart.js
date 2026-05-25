import { useState } from "react";
import axios from "axios";

function Cart({ cart = [], setShowCart }) {

  const [success, setSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  // TOTAL PRICE

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );


  // PLACE ORDER FUNCTION
const placeOrder = async () => {

  try{

    // COUNT ITEMS

    const itemCount = {};

    cart.forEach((item) => {

      if(itemCount[item.name]){

        itemCount[item.name]++;

      }

      else{

        itemCount[item.name] = 1;

      }

    });


    // CREATE ORDER STRING

    const orderItems = Object.entries(itemCount)

      .map(

        ([name, quantity]) =>

        `${name} x${quantity}`

      )

      .join(", ");


    const totalAmount = total + 40;


    const response = await axios.post(

      "http://127.0.0.1:7000/placeorder",

      {

       customer: localStorage.getItem("userEmail"),

        item: orderItems,

        amount: `₹${totalAmount}`,

        payment: paymentMethod,

        status: "Preparing"

      }

    );

    alert(response.data);

    setShowPayment(false);

    setSuccess(true);

  }

  catch(error){

    console.log(error);

    alert("Order Failed");

  }

};

  return (

    <div className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <button
          className="back-btn"
          onClick={() => window.history.back()}
        >
          ←
        </button>

        <h2>Your Cart</h2>

      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div style={{textAlign:"center", marginTop:"50px"}}>

          <h2>Your Cart is Empty 🛒</h2>

        </div>

      ) : (

        <>

          {/* CART ITEMS */}

          <div className="cart-items">

            {cart.map((item, index) => (

              <div className="cart-card" key={index}>

                <img
                  src={item.image}
                  alt=""
                />

                <div className="cart-info">

                  <h3>{item.name}</h3>

                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <p className="cart-time">
                    🕒 {item.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* COUPON */}

          <div className="coupon-box">

            <h3>Apply Coupon</h3>

            <input
              type="text"
              placeholder="Enter Coupon Code"
            />

            <button className="coupon-btn">
              Apply
            </button>

          </div>

          {/* ADDRESS */}

          <div className="address-box">

            <h3>Delivery Location</h3>

            <select className="location-dropdown">

              <option>Madhapur, Hyderabad</option>
              <option>Kukatpally, Hyderabad</option>
              <option>Gachibowli, Hyderabad</option>
              <option>Ameerpet, Hyderabad</option>
              <option>Hitech City, Hyderabad</option>
              <option>Banjara Hills, Hyderabad</option>

            </select>

          </div>

          {/* BILL */}

          <div className="bill-box">

            <div className="bill-row">

              <span>Item Total</span>

              <span>₹{total}</span>

            </div>

            <div className="bill-row">

              <span>Delivery Fee</span>

              <span>₹40</span>

            </div>

            <div className="bill-row total-row">

              <span>Total Amount</span>

              <span>₹{total + 40}</span>

            </div>

          </div>

          {/* PAYMENT BUTTON */}

          <button
            className="payment-btn"
            onClick={() => setShowPayment(true)}
          >
            Proceed To Payment
          </button>

        </>

      )}

      {/* PAYMENT POPUP */}

      {showPayment && (

        <div className="popup-bg">

          <div className="popup payment-popup">

            <h1>Select Payment Method</h1>

            <div className="payment-methods">

             <label>
  <input
    type="radio"
    name="payment"
    value="UPI"
    onChange={(e)=>setPaymentMethod(e.target.value)}
  />
  UPI
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="Cash On Delivery"
    defaultChecked
    onChange={(e)=>setPaymentMethod(e.target.value)}
  />
  Cash On Delivery
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="Debit / Credit Card"
    onChange={(e)=>setPaymentMethod(e.target.value)}
  />
  Debit / Credit Card
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="PhonePe"
    onChange={(e)=>setPaymentMethod(e.target.value)}
  />
  PhonePe
</label>

<label>
  <input
    type="radio"
    name="payment"
    value="Google Pay"
    onChange={(e)=>setPaymentMethod(e.target.value)}
  />
  Google Pay
</label>

            </div>

            <button
              className="payment-btn"
              onClick={placeOrder}
            >
              Confirm Payment
            </button>

          </div>

        </div>

      )}

      {/* SUCCESS POPUP */}

      {success && (

        <div className="popup-bg">

          <div className="popup success-popup">

            <h1>🎉 Order Confirmed</h1>

            <p>
              Your food is on the way 🍔
            </p>

            <h3>
              Estimated Delivery: 25 mins
            </h3>

            <button
              className="payment-btn"
              onClick={() => {

                setSuccess(false);

                window.location.href="/";

              }}
            >
              Back To Home
            </button>

          </div>

        </div>

      )}

    </div>

  );
}

export default Cart;