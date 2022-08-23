/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchLocation, fetchProducts, fetchRestaurant, fetchUserByEmail } from "../actions";
import SetTime from "./SetTime";
import Signout from "./Signout";

const Menu = () => {
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);
  const authError = useSelector(state => state.auth.errorMessage)
  const userEmail = useSelector(state => state.auth.email)
  const products = useSelector(state => state.products);
  const restaurant = useSelector(state => state.restaurant)
  const user = useSelector(state => state.user.user)
  const [signoutTrigger, setSignout] = useState(false)
  const [createTrigger, setCreate] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
    if(!restaurant[0]) {
      dispatch(fetchRestaurant())
    }
  }, [])

  useEffect(() => {
   if(userEmail){
      dispatch(fetchUserByEmail(userEmail))
    } 
  }, [authenticated])

  console.log(restaurant.placeId)
  useEffect(() => {
    if(restaurant.placeId){
      dispatch(fetchLocation(restaurant.placeId))
    }
  }, [])

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
          <h2>Coffee Drinks</h2>
          {renderCoffee()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2>Non Coffee Drinks</h2>
          {renderNonCoffee()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2>Lunch</h2>
          {renderLunch()}
        </div>
        <hr/>
        <div className="row cat-div">
          <h2>Breakfast</h2>
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
      <div className="pfp" style={{ "marginTop": "-40px"}}>
        <img onClick={handlePfpClick} src={pfp} alt={initial} />
      </div>
    ) : (
      <div className="pfp" style={{ "marginTop": "-40px"}}>
        <div onClick={handlePfpClick}>{initial}</div>
      </div>
    )
  }

  return (authenticated && user) ? (
    <div>
      <img className="hero" src="https://hopeandanchorcoffee.square.site/uploads/b/5982d32cc4467ff501f3090ae965c7b926a36bc89cf00d611a8787d034f4d885/20476052_333653513758935_4535391380775282065_n_1618593385.jpeg" alt="hope and anchor" />
      <div style={{ "width": "70px", "float": "right", "height": "70px" }}>
        {renderPfp()}
      </div>
      <div className="signout" onClick={() => {
        navigate("signout")
        setSignout(true)
      }}></div>
      <div className="createorder" onClick={() => {
        navigate("/set-time")
        setCreate(true)
      }}></div>
      <h2 className="text-center menu-title">Menu</h2>
      <div className="row d-flex justify-content-center all-products">
        {renderProducts()}
      </div>
      <Signout trigger={signoutTrigger} toggleTrigger={setSignout} />
      <SetTime trigger={createTrigger} toggleTrigger={setCreate} />
    </div>
  ) : (
    <div>
      <div className="signup" onClick={() => navigate("/account/signup")}></div>
      <div className="signin" onClick={() => navigate("/account/signin")}></div>
      <img className="hero" src="https://hopeandanchorcoffee.square.site/uploads/b/5982d32cc4467ff501f3090ae965c7b926a36bc89cf00d611a8787d034f4d885/20476052_333653513758935_4535391380775282065_n_1618593385.jpeg" alt="hope and anchor"/>
      <h2 className="text-center menu-title">Menu</h2>
      <div className="row d-flex justify-content-center all-products">
        {renderProducts()}
      </div>
    </div>
  )
}

export default Menu;
