/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts, fetchRestaurant, fetchUser } from "../actions";
import SetTime from "./SetTime";
import Signout from "./Signout";
import coffeeLoading from "../Coffee_Loading.gif"

const Menu = () => {
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);
  const authError = useSelector(state => state.auth.errorMessage)
  const products = useSelector(state => state.products);
  const restaurant = useSelector(state => state.restaurant)
  const user = useSelector(state => state.user.user)
  const [signoutTrigger, setSignout] = useState(false)
  const [createTrigger, setCreate] = useState(false)
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
    
    if(products.length){
      setIsLoading(false)
    }
    
    if(!restaurant[0]) {
      dispatch(fetchRestaurant())
    }
  }, [products.length]);
  
  useEffect(() => {
    if(token && !user){
      dispatch(fetchUser(token))
    }
  }, [token])

  const getProducts = () => {
    dispatch(fetchProducts())
  }
 
  if(authError?.message === "Request failed with status code 401"){
    navigate("/account/signin", { state: "Incorrect Username or Password" })
  }

  const handleItemClick = () => {
    if(authenticated){
      navigate("/set-time")
      setCreate(true)
    } else {
      alert("Signin to place an order")
    }
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
      <p>Lunch only served 11:00am - 2:30pm</p>
    )
  }

  const renderBreakfast = () => {
    return breakfasts[0] ? breakfasts.map((breakfast, i) => {
      return breakfast ? (
        <div onClick={handleItemClick} className="card col product-card" key={i}>
          <img src={breakfast.picture} alt="product" />
          <h3>{breakfast.title}</h3>
          <p>{`$${breakfast.price.Any.$numberDecimal}`}</p>
          <p>{breakfast.description}</p>
        </div>
      ) : ""
    }) : (
        <p>Breakfast only served 7:00am - 11:00am</p>
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
    navigate(`/profile`, { state: user })
  }

  const initial = user?.name ? user.name.first[0] : undefined;

  if(isLoading){
    return (
      <img style={{"width": "200px", "marginLeft": "41vw", "marginTop": "50px"}} src={coffeeLoading} alt="loading" />
    )
  }

  const locationUrl = restaurant.title ? "https://www.google.com/maps/embed/v1/place?key=AIzaSyBhffW2K0hmR5dOA5Jg4UsW_a9YY_1AhyI&q=" + restaurant.title : ""
  
  return (user?.name) ? (
    <div>
      <div title="Your Profile" style={{ "width": "10%", "float": "left", "margin": "auto"}}>
        <div className="pfp">
          <div onClick={handlePfpClick}>{initial}</div>
        </div>
      </div>
      <div style={{ "width": "8%", "float": "right"}}>
        <div className="nav-item" onClick={() => {
          navigate("signout")
          setSignout(true)
        }}>Signout</div>
      </div>
      <div style={{ "width": "13%", "float": "right"}}>
        <div className="nav-item" onClick={() => {
          navigate("/set-time")
          setCreate(true)
        }}>Create Order</div>
      </div>
      <div style={{"width": "100%", "margin": "auto", "padding": "80px"}}>
        <h1 id="restaurant-title">{restaurant.title}</h1>
        <h3 className="restaurant-phone">Hours:</h3>
        <p className="restaurant-phone">Monday - Friday:  7am - 3pm</p>
        <p className="restaurant-phone">Saturday:  8am - 3pm</p>
        <h3 className="restaurant-phone" style={{"paddingBottom": "20px"}}>Phone: {restaurant.phone}</h3>
        <div className="row">
          <img className="hero col-6" src={restaurant.img} alt="hope and anchor" />
          <iframe
            className="col-6"
            title="coffeeshop map"
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={locationUrl}>
          </iframe>
        </div>
      </div>
      <h2 className="text-center menu-title">Menu</h2>
      <div className="row d-flex justify-content-center all-products">
        {renderProducts()}
      </div>
      <Signout trigger={signoutTrigger} toggleTrigger={setSignout} />
      <SetTime trigger={createTrigger} toggleTrigger={setCreate} />
    </div>
  ) : (
    <div>
      <div style={{ "width": "8%", "float": "right"}}>
        <div className="nav-item" onClick={() => navigate("/account/signup")}>Signup</div>
      </div>
      <div style={{ "width": "8%", "float": "right"}}>
        <div className="nav-item" onClick={() => navigate("/account/signin")}>Signin</div>
      </div>
      <div style={{"width": "100%", "margin": "auto", "padding": "80px"}}>
        <h1 id="restaurant-title">{restaurant.title}</h1>
        <h3 className="restaurant-phone">Hours:</h3>
        <p className="restaurant-phone">Monday - Friday:  7am - 3pm</p>
        <p className="restaurant-phone">Saturday:  8am - 3pm</p>
        <h3 className="restaurant-phone" style={{"paddingBottom": "20px"}}>Phone: {restaurant.phone}</h3>
        <div className="row">
          <img className="hero col-6" src={restaurant.img} alt="hope and anchor" />
          <iframe
            className="col-6"
            title="coffeeshop map"
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={locationUrl}>
          </iframe>
        </div>
      </div>
      <h2 className="text-center menu-title">Menu</h2>
      <div className="row d-flex justify-content-center all-products">
        {renderProducts()}
      </div>
    </div>
  )
}

export default Menu;
