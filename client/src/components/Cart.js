import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import exitimage from "../images/exit.png"

const Cart = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.user.cart);

  if(!cart){
    navigate("/")
  }

  let price = 0;
  cart.forEach(item => {
    price += Number(item.price)
  })
  const totalPrice = price.toFixed(2)

  const renderCartItems = () => {
    return cart[0] ? cart.map(item => {

      const renderItem = (option) => {
        if(option === "notes") {
          return (
            <p className="item-option">Note: {item[option]}</p>
          )
        }
        return item[option] ? (
          <p className="item-option">{item[option]}</p>
        ) : ""
        }

      return (
        <div className="card cart-card" style={{"paddingBottom": "10px"}}>
          <h3 style={{"marginBottom": "0px", "marginTop": "10px"}}>{item.title}</h3>
          {renderItem("size")}
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

  const renderCheckout = () => {
    return cart[0] ? (
      <button className="continue-menu" style={{"marginLeft": "0px"}}>Checkout</button>
    ) : ""
  }
  
  return trigger ? (
    <div className="popup-outer">
      <div className="popup-inner" style={{"minWidth": "500px", "maxHeight": "500px", "overflow": "scroll"}}>
        <img className="exit" onClick={() => {
          toggleTrigger(false);
          navigate(-1)
        }} src={exitimage} alt="close" style={{"marginLeft": "0px"}} width="20px" />
        <div className="render-cart">
          <h2>Your Cart:</h2>
          {renderCartItems()}
          <h2>{`Cart Total: $${totalPrice}`}</h2>
          {renderCheckout()}
          
        </div>
      </div>
    </div>
  ) : ""
}

export default Cart;