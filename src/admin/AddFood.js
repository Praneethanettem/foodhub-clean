import { useState } from "react";
import axios from "axios";


function AddFood() {

  const [foodName,setFoodName] = useState("");

  const [price,setPrice] = useState("");

  const [image,setImage] = useState("");

  const [category,setCategory] = useState("");

const handleAddFood = async () => {

  try {

    const response = await axios.post(

      "http://127.0.0.1:7000/addfood",

      {

        name: foodName,

        price: price,

        image: image,

        category: category

      }

    );

    alert(response.data);

    setFoodName("");

    setPrice("");

    setImage("");

    setCategory("");

  }

  catch(error) {

    console.log(error);

    alert("Food Add Failed");

  }

};

  return (

    <div className="addfood-page">

      <div className="addfood-card">

        <h1>
          🍔 Add Food Item
        </h1>

        <p>
          Add delicious food items to your restaurant
        </p>

        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">
            Select Category
          </option>

          <option>
            Veg
          </option>

          <option>
            Non Veg
          </option>

          <option>
            Desserts
          </option>

          <option>
            Drinks
          </option>

          <option>
            Fast Food
          </option>

        </select>

        <button onClick={handleAddFood}>

          Add Food

        </button>

      </div>

    </div>

  );

}

export default AddFood;