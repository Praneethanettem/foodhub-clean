import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

function Dashboard() {

  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);

  const [revenue, setRevenue] = useState(0);

  // FETCH DATA

  useEffect(() => {

    fetchOrders();

    fetchUsers();

  }, []);

  // FETCH ORDERS

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

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:7000/users"

      );

      setUsers(response.data);

    }

    catch(error) {

      console.log(error);

    }

  };

  // CALCULATE REVENUE

  useEffect(() => {

    let total = 0;

    orders.forEach((order) => {

      total += Number(

        order.amount.replace("₹","")

      );

    });

    setRevenue(total);

  }, [orders]);

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h1 className="sidebar-logo">
          🍔 FoodHub
        </h1>

        <p className="sidebar-text">
          Admin Panel
        </p>

        <div className="sidebar-links">

          <Link to="/dashboard">
            📊 Dashboard
          </Link>

          <Link to="/addfood">
            🍔 Add Food
          </Link>

          <Link to="/orders">
            📦 Orders
          </Link>

          <Link to="/users">
            👥 Users
          </Link>

        </div>

      </div>

      {/* MAIN SECTION */}

      <div className="dashboard-main">

        <h1 className="dashboard-heading">
          Welcome Admin 👋
        </h1>

        <p className="dashboard-subheading">
          Manage your restaurant professionally
        </p>

        {/* TOP CARDS */}

        <div className="dashboard-stats">

          <div className="stat-card">

            <h2>{orders.length}</h2>

            <p>Total Orders</p>

          </div>

          <div className="stat-card">

            <h2>₹{revenue}</h2>

            <p>Total Revenue</p>

          </div>

          <div className="stat-card">

            <h2>{users.length}</h2>

            <p>Total Users</p>

          </div>

          <div className="stat-card">

            <h2>{orders.length}</h2>

            <p>Food Items</p>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions">

          <Link to="/addfood" className="action-btn">
            Add New Food
          </Link>

          <Link to="/orders" className="action-btn">
            View Orders
          </Link>

          <Link to="/users" className="action-btn">
            Manage Users
          </Link>

        </div>

        {/* RECENT ORDERS */}

        <div className="recent-orders">

          <h2>
            Recent Orders
          </h2>

          <table>

            <thead>

              <tr>

                <th>Customer</th>

                <th>Food Item</th>

                <th>Status</th>

                <th>Amount</th>

              </tr>

            </thead>

            <tbody>

              {orders.slice(0,5).map((order) => (

                <tr key={order.id}>

                  <td>{order.customer}</td>

                  <td>{order.item}</td>

                  <td
                    className={
                      order.status === "Delivered"
                      ? "delivered"
                      : "pending"
                    }
                  >

                    {order.status}

                  </td>

                  <td>{order.amount}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;