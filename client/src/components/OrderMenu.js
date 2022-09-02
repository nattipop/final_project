import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchAvailable } from "../actions";
import Cart from "./Cart";
import Signout from "./Signout";

const OrderMenu = () => {
  const location = useLocation();
  const date = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerSignout, setTrigger] = useState(false);
  const [triggerCart, setCart] = useState(false)
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.user.user);
  const time = date.toLocaleTimeString("it-IT");

  useEffect(() => {
    dispatch(fetchAvailable(time))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignout = () => {
    setTrigger(true)
    navigate("/order-menu/signout", {state: date});
  }

  const handleItemClick = (e) => {
    let title = e.target.parentElement.childNodes[1].innerHTML
    if(e.target.classList.contains("card")){
      title = e.target.childNodes[1].innerHTML;
    }

    const item = products.find(product => {
      return product.title === title
    })

    navigate(`/products/${item._id}`, {state: date})
  }

  const coffees = [];
  const nonCoffees = [];
  const lunches = [];
  const breakfasts = [];

  const renderCoffee = () => {
    return coffees.map((coffee, i) => {
      return coffee ? (
        <div onClick={handleItemClick} className="card col product-card" key={i}>
          <img src={coffee.picture} alt="product" />
          <h3>{coffee.title}</h3>
          <p>{`$${coffee.price.Small.$numberDecimal} - $${coffee.price.Large.$numberDecimal}`}</p>
          <p>{coffee.description}</p>
        </div>
      ) : ""
    })
  }

  const renderNonCoffee = () => {
    return nonCoffees.map((drink, i) => {
      return drink ? (
        <div onClick={handleItemClick} className="card col product-card" key={i}>
          <img src={drink.picture} alt="product" />
          <h3>{drink.title}</h3>
          <p>{`$${drink.price.Small.$numberDecimal} - $${drink.price.Large.$numberDecimal}`}</p>
          <p>{drink.description}</p>
        </div>
      ) : ""
    })
  }

  const renderLunch = () => {
    return lunches[0] ? lunches.map((lunch, i) => {
      return lunch ? (
        <div onClick={handleItemClick} className="card col product-card" key={i}>
          <img src={lunch.picture} alt="product" />
          <h3>{lunch.title}</h3>
          <p>{`$${lunch.price.Half.$numberDecimal} - $${lunch.price.Whole.$numberDecimal}`}</p>
          <p>{lunch.description}</p>
        </div>
      ) : ""
    }) : (
      <p className="text-center">Lunch only served 11:00am - 2:30pm</p>
    )
  }

  const renderBreakfast = () => {
    return breakfasts[0] ? breakfasts.map((breakfast, i) => {
      return breakfast ? (
        <div onClick={handleItemClick} className="card col product-card" key={i}>
          <img src={breakfast.picture} alt="product" />
          <h3>{breakfast.title}</h3>
          <p>${breakfast.price.Any.$numberDecimal}</p>
          <p>{breakfast.description}</p>
        </div>
      ) : ""
    }) : (
        <p className="text-center">Breakfast only served 7:00am - 11:00am</p>
      )
  }

  const renderProducts = () => {
    products.forEach(product => {
      switch(product.category){
        case "coffee":
          coffees.push(product);
          break;
        case "non-coffee":
          nonCoffees.push(product);
          break;
        case "lunch":
          lunches.push(product);
          break;
        case "breakfast":
          breakfasts.push(product);
          break;
        default:
          break;
      }
    })

    return (
      <div>
        <hr/>
        <div className="row cat-div">
          <h2 className="text-center">Coffee Drinks</h2>
          {renderCoffee()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2 className="text-center">Non Coffee Drinks</h2>
          {renderNonCoffee()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2 className="text-center">Lunch</h2>
          {renderLunch()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2 className="text-center">Breakfast</h2>
          {renderBreakfast()}
        </div>
      </div>
    )
  }

  const handlePfpClick = () => {
    navigate(`/profile/${user.name.first}`, { state: user })
  }

  const renderPfp = () => {
    const pfp = user.picture?.profile || null;
    const initial = user.name.first[0];

    return pfp ? (
      <div className="pfp">
        <img onClick={handlePfpClick} src={pfp} alt={initial} />
      </div>
    ) : (
      <div className="pfp">
        <div onClick={handlePfpClick}>{initial}</div>
      </div>
    )
  }
  
  const handleCartClick = () => {
    setCart(true)
    navigate("/order-menu/cart", {state: date});
  }

  return (date && user)? (
    <div>
      <div style={{ "width": "70px", "float": "right", "height": "70px", "marginTop": "-35px" }}>
        {renderPfp()}
      </div>
      <div className="cartimage" onClick={handleCartClick}></div>
      <div className="signout" onClick={handleSignout} ></div>
      <div className="signup" onClick={() => navigate("/")}>Go Back</div>
      <h3 className="pickup-time">{`Your scheduled pickup time: ${date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit'})}`}</h3>
      <h2 className="available-items">Available Items:</h2>
      <div className="d-flex justify-content-center all-products">
        {renderProducts()}
      </div>
      <Signout trigger={triggerSignout} toggleTrigger={setTrigger} />
      <Cart trigger={triggerCart} toggleTrigger={setCart} />
    </div>
  ) : navigate("/account/signin")
}

export default OrderMenu;