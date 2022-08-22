import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import exitimage from "../images/exit.png"

const Cart = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.user.cart);

  if(!cart){
    navigate("/")
  }

  console.log(cart)

  const renderCartItems = () => {
    return cart[0] ? cart.map(item => {

      const renderItem = (option) => {
        if(option === "notes") {
          return (
            <p className="item-option">Note: {item[option]}</p>
          )
        }
        return item[option] ? (
          <p className="item-option">- {item[option]}</p>
        ) : ""
      }

      const renderPrice = () => {
        const netPrice = parseInt(item.net_price)
        const flavor = item.flavor ? 0.6 : 0
        const fullPrice = item.net_price + flavor;
      }

      return (
        <div className="card cart-card">
          <h3 style={{"marginBottom": "0px"}}>{item.title}</h3>
          {renderItem("size")}
          {renderItem("hot_iced")}
          {renderItem("cream")}
          {renderItem("flavor")}
          {renderItem("extra_espresso")}
          {renderItem("notes")}
          {renderPrice()}
        </div>
      )
    }) : (
      <div>
        <h3>You currently have no items in your cart.</h3>
      </div>
    )
  }

  return trigger ? (
    <div className="popup-outer">
      <div className="popup-inner" style={{"minWidth": "700px", "maxHeight": "500px", "overflow": "scroll"}}>
        <img className="exit" onClick={() => {
          toggleTrigger(false);
          navigate(-1)
        }} src={exitimage} alt="close" style={{"marginLeft": "0px"}} width="20px" />
        <div>
          {renderCartItems()}
        </div>
      </div>
    </div>
  ) : ""
}

export default Cart;