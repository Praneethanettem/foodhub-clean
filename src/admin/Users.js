import axios from "axios";

import { useEffect, useState } from "react";

function Users() {

  const [users,setUsers] = useState([]);


  useEffect(()=>{

    axios.get("http://127.0.0.1:7000/users")

    .then((response)=>{

      setUsers(response.data);

    })

    .catch((error)=>{

      console.log(error);

    });
  
  },[]);
const deleteUser = async (id) => {

  try {

   const response = await axios.get(

`http://127.0.0.1:7000/deleteuser/${id}`

);

    alert(response.data);

    setUsers(

      users.filter((user) => user.id !== id)

    );

  }

  catch(error) {

    console.log(error);

    alert("Delete Failed");

  }
};
  return (

    <div className="users-container">

      <h1 className="users-heading">

        👥 Registered Users

      </h1>

      <p className="users-subheading">

        Manage all restaurant users

      </p>


      <div className="users-table-box">

        <table className="modern-users-table">

          <thead>

  <tr>

    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Action</th>

  </tr>

</thead>
          <tbody>

            {users.map((user)=>(

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>
                <td>

  <button
    className="delete-btn"
    onClick={() => deleteUser(user.id)}
  >

    Delete

  </button>

</td>
                

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Users;