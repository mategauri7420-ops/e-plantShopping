import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores from air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Restores moisture naturally.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Cleans indoor toxins efficiently.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/01/aloe-vera-3284620_1280.jpg", description: "Purifies air and heals skin.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000", description: "Calming floral fragrance.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729800077-ac6c8a000300?q=80&w=1000", description: "Sweet night-blooming scent.", cost: "$22" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herbal aroma.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/19/17/47/mint-1149971_1280.jpg", description: "Fresh and crisp scent.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/11/29/02/05/eucalyptus-1866750_1280.jpg", description: "Soothing woody fragrance.", cost: "$18" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/18/16/07/lemon-balm-2323932_1280.jpg", description: "Refreshing citrus aroma.", cost: "$14" }
      ]
    },
    {
      category: "Low Maintenance Succulents",
      plants: [
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2017/02/15/10/39/jade-plant-2068289_1280.jpg", description: "Symbol of good luck and resilience.", cost: "$15" },
        { name: "Echeveria", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/succulent-1846158_1280.jpg", description: "Rose-shaped drought-tolerant beauty.", cost: "$12" },
        { name: "Zebra Cactus", image: "https://cdn.pixabay.com/photo/2018/06/10/17/39/succulent-3466907_1280.jpg", description: "Striking striped succulent.", cost: "$14" },
        { name: "String of Pearls", image: "https://cdn.pixabay.com/photo/2021/01/14/06/00/string-of-pearls-5915809_1280.jpg", description: "Cascading pearl-like foliage.", cost: "$16" },
        { name: "Haworthia", image: "https://cdn.pixabay.com/photo/2020/05/10/11/42/succulent-5153685_1280.jpg", description: "Compact and thrives indoors.", cost: "$11" },
        { name: "Burro's Tail", image: "https://cdn.pixabay.com/photo/2019/05/27/19/08/succulent-4233481_1280.jpg", description: "Fleshy trailing stems.", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <a href="#plants" onClick={() => setShowCart(false)}>Plants</a>
          <div className="cart-icon-container" onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-count">{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} id="plants">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
