import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { editCart } from "../actions";

const Cart = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const date = location.state;
  const time = date.toLocaleTimeString('en-US', {hour12: false});
  const cart = useSelector(state => state.user.cart);
  const user = useSelector(state => state.user.user)
  const [filteredCart, setFilteredCart] = useState([])
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setFilteredCart(cart.filter(items => {
      return items.availability.start < time && items.availability.end > time
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleItemRemove = (e) => {
    const index = e.target.parentElement.getAttribute("index");

    let updatedCart = [];
    cart.forEach(item => updatedCart.push(item))
    updatedCart.splice(index, 1)
    dispatch(editCart(user._id, updatedCart))
  } 

  if(!cart){
    navigate("/")
  }

  let price = 0;
  filteredCart.forEach(item => {
    price += Number(item.price)
  })
  const tax = (price * 0.05);
  const withTax = price + tax;
  const totalPrice = withTax.toFixed(2);
  
  console.log(filteredCart)

  const renderCartItems = () => {
    return filteredCart[0] ? filteredCart.map((item, i) => {

      const renderItem = (option) => {
        if(option === "notes") {
          return (
            <p className="item-option">Note: {item[option]}</p>
          )
        }
        return item[option] ? (
          <div>
            <p className="item-option">{item[option]}</p>
          </div>
        ) : ""
        }

      return (
        <div index={i} key={i} className="card cart-card" style={{"paddingBottom": "10px"}}>
          <p onClick={handleItemRemove} title="remove from cart" className="x-item">x</p>
          <h3 style={{"marginBottom": "0px", "marginTop": "10px"}}>{item.title}</h3>
          {renderItem("size")}
          {renderItem("tea_kind")}
          {renderItem("roast")}
          {renderItem("capp")}
          {renderItem("bread")}
          {renderItem("meat")}
          {renderItem("second_meat")}
          {renderItem("cheese")}
          {renderItem("chai_option")}
          {renderItem("milk")}
          {renderItem("side")}
          {renderItem("hot_iced")}
          {renderItem("cream")}
          {renderItem("flavor")}
          {renderItem("addVeggies")}
          {renderItem("addPB")}
          {renderItem("extra_espresso")}
          {renderItem("cream_cheese")}
          {renderItem("whip")}
          {renderItem("notes")}
          <p className="item-option">${item.price}</p>
        </div>
      )
    }) : (
      <div>
        <p className="no-items">You currently have no items in your cart.</p>
      </div>
    )
  }

  const handleCheckout = () => {
    const orderInfo = {
      items: filteredCart,
      priceTotal: totalPrice,
      tax: tax.toFixed(2)
    }
    
    navigate("/order-checkout", { state: orderInfo })
  }

  const renderCheckout = () => {
    return cart[0] ? (
      <button onClick={handleCheckout} className="continue-menu" style={{"marginLeft": "0px"}}>Checkout</button>
    ) : ""
  }
  
  return trigger ? (
    <div className="popup-outer">
      <div className="popup-inner" style={{"minWidth": "500px", "maxHeight": "500px", "overflow": "scroll"}}>
        <div className="exit" onClick={() => {
          toggleTrigger(false);
          navigate(-1)
        }} alt="close" style={{"marginTop": "-10px"}} width="20px">x</div>
        <div className="render-cart">
          <h2>Your Cart:</h2>
          {renderCartItems()}
          <p className="tax">{`Tax: $${tax.toFixed(2)}`}</p>
          <h2>{`Cart Total: $${totalPrice}`}</h2>
          {renderCheckout()}
        </div>
      </div>
    </div>
  ) : ""
}

export default Cart;