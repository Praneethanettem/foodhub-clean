function FoodCard({ item, addToCart }) {

  return (

    <div className="card">

      <div className="offer-badge">
        {item.offer}
      </div>

      <img src={item.img} alt={item.name} />

      <div className="card-content">

        <div className="veg-row">

          <div
            className={item.veg ? "veg-box" : "nonveg-box"}
          >
            ●
          </div>

          <span>
            {item.veg ? "Veg" : "Non-Veg"}
          </span>

        </div>

        <h3>{item.name}</h3>

        <p className="price">
          ₹{item.price}
        </p>

        <p>⭐ {item.rating}</p>

        <p>🕒 {item.time} mins</p>

        <p className="description">
          {item.description}
        </p>

        <button onClick={() => addToCart(item)}>
          Add to Cart
        </button>

      </div>

    </div>

  );
}

export default FoodCard;