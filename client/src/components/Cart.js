import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { editCart } from "../actions";
import exitimage from "../images/exit.png"

const Cart = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const date = location.state;
  const cart = useSelector(state => state.user.cart);
  const user = useSelector(state => state.user.user)
  console.log(date)

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
  cart.forEach(item => {
    price += Number(item.price)
  })
  const tax = (price * 0.05);
  const withTax = price + tax;
  const totalPrice = withTax.toFixed(2);
  

  const renderCartItems = () => {
    return cart[0] ? cart.map((item, i) => {

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
          <p className="tax">{`Tax: $${tax.toFixed(2)}`}</p>
          <h2>{`Cart Total: $${totalPrice}`}</h2>
          {renderCheckout()}
        </div>
      </div>
    </div>
  ) : ""
}

export default Cart;