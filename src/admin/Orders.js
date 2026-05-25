
import { useEffect, useState } from "react";

import axios from "axios";


function Orders() {

  const [orders, setOrders] = useState([]);
const [revenue, setRevenue] = useState(0);

const [deliveredOrders, setDeliveredOrders] = useState(0);

const [preparingOrders, setPreparingOrders] = useState(0);

  // FETCH ORDERS

  useEffect(() => {

    fetchOrders();


  }, []);
useEffect(() => {

  let totalRevenue = 0;

  let delivered = 0;

  let preparing = 0;

  orders.forEach((order) => {

    totalRevenue += Number(

      order.amount.replace("₹","")

    );

    if(order.status === "Delivered"){

      delivered++;

    }

    if(order.status === "Preparing"){

      preparing++;

    }

  });

  setRevenue(totalRevenue);

  setDeliveredOrders(delivered);

  setPreparingOrders(preparing);

}, [orders]);

  const fetchOrders = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:7000/orders"

      );

      setOrders(response.data);

    }

    catch(error) {

      console.log(error);

    }

  };
  return (

    <div className="orders-container">


      {/* HEADER */}

      <div className="orders-header">

        <div className="orders-icon">

          📦

        </div>

        <div>

          <h1 className="orders-heading">

            Orders Management

          </h1>

          <p className="orders-subheading">

            Manage customer food orders

          </p>

        </div>

      </div>
{/* SUMMARY CARDS */}

<div className="orders-summary">

  <div className="summary-card">

    <h2>{orders.length}</h2>

    <p>Total Orders</p>

  </div>

  <div className="summary-card">

    <h2>{deliveredOrders}</h2>

    <p>Delivered Orders</p>

  </div>

  <div className="summary-card">

    <h2>{preparingOrders}</h2>

    <p>Preparing Orders</p>

  </div>

  <div className="summary-card">

    <h2>₹{revenue}</h2>

    <p>Total Revenue</p>

  </div>

</div>

      {/* TABLE */}

      <div className="orders-table-box">

        <table className="modern-orders-table">

          <thead>

            <tr>

              <th>Order ID</th>
              <th>Customer</th>
              <th>Food Item</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.item}</td>

                <td>{order.payment}</td>

                <td>{order.amount}</td>

                <td>

                  <span
                    className={

                      order.status === "Delivered"

                      ? "delivered-badge"

                      : order.status === "Preparing"

                      ? "preparing-badge"

                      : "pending-badge"

                    }
                  >

                    {order.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Orders;