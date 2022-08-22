import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { addToCart } from "../../actions";

const CoffeeOptions = ({product}) => {
  const flavors = useSelector(state => state.restaurant.flavors);
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let optionValues = {
    title: product.title,
    net_price: product.price,
    hot_iced: undefined,
    size: undefined,
    cream: undefined,
    flavor: undefined,
    extra_espresso: undefined,
    notes: undefined
  }

  const handleAddToCart = () => {
    if(!user){
      navigate("/account/signin")
      alert("You must be signed in to add to cart")
    }

    if(user){
      dispatch(addToCart(user._id, optionValues));
      navigate(-1)
    }
  }

  const renderCreamOption = () => {
    return (product.title === "Americano" || product.title === "Brewed Coffee") ? (
      <select onChange={e => optionValues.cream = e.target.value} className="options form-select">
        <option defaultValue>Add Cream</option>
        <option value="">No Cream</option>
        <option value="Cream">Cream</option>
      </select>
    ) : ""
  }

  const renderFlavors = () => {
    if(flavors){
      return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
    }
  }

  return (
    <div>
      <select onChange={e => optionValues.hot_iced = e.target.value} className="options form-select">
        <option defaultValue>Hot or Iced</option>
        <option value="Hot">Hot</option>
        <option value="Iced">Iced</option>
      </select>
      <select onChange={e => {
        optionValues.size = e.target.value
      }} className="size options form-select">
        <option defaultValue>Size</option>
        <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
        <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
        <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
      </select>
      {renderCreamOption()}
      <select onChange={e => optionValues.flavor = e.target.value} className="options form-select">
        <option defaultValue>Flavor</option>
        {renderFlavors()}
      </select>
      <select onChange={e => optionValues.extra_espresso = e.target.value} className="options form-select">
        <option defaultValue>{"Extra Espresso (not required)"}</option>
        <option value="1 shot">{"1 Extra Shot"}</option>
        <option value="2 shots">{"2 Extra Shots"}</option>
        <option value="3 shots">{"3 Extra Shots"}</option>
      </select>
      <textarea onChange={e => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default CoffeeOptions;