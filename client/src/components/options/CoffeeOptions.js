import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { addToCart } from "../../actions";

const CoffeeOptions = ({product}) => {
  const flavors = useSelector(state => state.restaurant.flavors);
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(undefined);
  const [coffeeTemp, setCoffeeTemp] = useState(undefined);
  const [milk, setMilk] = useState(undefined);
  const [whipped, setWhip] = useState(false);
  const [cream, setCream] = useState(false);
  const [coffeeRoast, setRoast] = useState(undefined);
  const [cappuccino, setCapp] = useState(undefined);
  const [flavor, setFlavor] = useState(undefined);
  const [dirtyChai, setDirtyChai] = useState(undefined);

  console.log(coffeeTemp)

  let price = (size) ? product.price[size].$numberDecimal : undefined
  let decimal = Number(price);
  
  let optionValues = {
    availability: {
      start: product.availability.start,
      end: product.availability.end
    },
    title: product.title,
    net_price: price,
    hot_iced: coffeeTemp,
    milk: milk,
    size: size,
    flavor: flavor,
    extra_espresso: undefined,
    notes: undefined,
    price: undefined,
    whip: whipped ? "Whipped Cream" : undefined,
    cream: cream ? "Add Cream" : undefined,
    roast: coffeeRoast,
    capp: cappuccino,
    chai_option: dirtyChai,
    picture: product.picture
  }

  const handleAddToCart = () => {
    if(!optionValues.hot_iced && product.title !== "Brewed Coffee" && product.title !== "Cappuccino" && product.title !== "Cold Press Coffee"){
      return alert("Please choose Hot or Iced")
    }
    if(!optionValues.size){
      return alert("Please choose Size")
    }
    if(product.title === "Latte" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Mocha" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Dirty Chai" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Caramel Macchiato" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Cappuccino" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Americano" && !optionValues.cream){
      return alert("Please choose Cream Option")
    }
    if(product.title === "Brewed Coffee" && !optionValues.cream){
      return alert("Please choose Cream Option")
    }
    if(optionValues.flavor){
      decimal += 0.6
    }

    switch(optionValues.extra_espresso){
      case "1 shot":
        decimal += 0.6;
        break;
      case "2 shots":
        decimal += 1.2;
        break;
      case "3 shots":
        decimal += 1.8;
        break;
      default:
        break;
    }

    switch(optionValues.milk){
      case "Oat Milk":
        decimal += 0.6;
        break;
      case "Almond Milk":
        decimal += 0.6;
        break;
      default:
        break;
    }

    optionValues.price = decimal.toFixed(2);

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
    return (product.title === "Americano" || product.title === "Brewed Coffee" || product.title === "Cold Press Coffee") ? (
      <div className="form-check options">
        <input onChange={() => setCream(!cream)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" for="flexCheckDefault">
          Add Cream
        </label>
      </div>
    ) : ""
  }

  const renderFlavors = () => {
    if(flavors){
      return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
    }
  }

  const renderWhip = () => {
    return (product.title === "Mocha") ? (
      <div className="form-check options">
        <input onChange={() => setWhip(!whipped)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" for="flexCheckDefault">
          Add Whipped Cream
        </label>
      </div>
    ) : ""
  }
  
  const renderMilkOption = () => {
    return (product.title === "Latte" || product.title === "Mocha" || product.title === "Cappuccino" || product.title === "Caramel Macchiato" || product.title === "Dirty Chai") ? (
      <select onChange={e => setMilk(e.target.value)} className="options form-select">
        <option defaultValue>Milk Options</option>
        <option value="Whole Milk">Whole Milk</option>
        <option value="Skim Milk">Skim Milk</option>
        <option value="Oat Milk">Oat Milk</option>
        <option value="Almond Milk">Almond Milk</option>
      </select>
    ) : ""
  }
  const FlavorOption = () => {
    return (product.title !== "Caramel Macchiato") ? (
      <select onChange={e => {
        setFlavor(e.target.value);
      }} className="options form-select">
        <option defaultValue>Flavor</option>
        {renderFlavors()}
      </select>
    ) : ""
  }

  if(product.title === "Dirty Chai"){
    return (
      <div>
        <select onChange={e => {
          setSize(e.target.value)
        }} className="size options form-select">
          <option defaultValue>Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <select onChange={e => {
          setCoffeeTemp(e.target.value)
        }} className="options form-select">
          <option defaultValue>Hot or Iced</option>
          <option value="Hot">Hot</option>
          <option value="Iced">Iced</option>
        </select>
        <select onChange={e => setDirtyChai(e.target.value)} className="options form-select">
          <option defaultValue>Choose Kind</option>
          <option value="Spiced">Spiced Chai</option>
          <option value="Vanilla">Vanilla Chai</option>
          <option value="Raspberry">Raspberry Chai</option>
          <option value="Pumpkin Spice">Pumpkin Spice Chai</option>
        </select>
        <select onChange={e => {
          optionValues.extra_espresso = e.target.value;
        }} className="options form-select">
          <option defaultValue>{"Extra Espresso (If you want more than 1 shot)"}</option>
          <option value="1 shot">{"1 Extra Shot"}</option>
          <option value="2 shots">{"2 Extra Shots"}</option>
          <option value="3 shots">{"3 Extra Shots"}</option>
        </select>
        {renderMilkOption()}
        {FlavorOption()}
        <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
      </div>
    )
  }

  if(product.title === "Brewed Coffee"){
    return (
      <div>
        <select onChange={e => setRoast(e.target.value)} className="options form-select">
          <option defaultValue>Choose Roast</option>
          <option value="6 Lakes">6 Lakes - House Blend</option>
          <option value="Flavor">Flavor of the Day</option>
          <option value="Dark">Dark Roast</option>
          <option value="Decaf">Decaf</option>
        </select>
        <select onChange={e => {
          setSize(e.target.value)
        }} className="size options form-select">
          <option defaultValue>Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        {renderCreamOption()}
        {FlavorOption()}
        <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
      </div>
    )
  }

  if(product.title === "Cold Press Coffee") {
    return (
      <div>
        <select onChange={e => {
          setSize(e.target.value)
        }} className="size options form-select">
          <option defaultValue>Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        {renderCreamOption()}
        {FlavorOption()}
        <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
      </div>
    )
  }

  const renderHotorIced = () => {
    return (product.title !== "Cappuccino" && product.title !== "Cold Press Coffee") ? (
      <select onChange={e => {
        setCoffeeTemp(e.target.value)
      }} className="options form-select">
        <option defaultValue>Hot or Iced</option>
        <option value="Hot">Hot</option>
        <option value="Iced">Iced</option>
      </select>
    ) : ""
  }

  const renderCapp = () => {
    return (product.title === "Cappuccino") ? (
      <select onChange={e => {
        setCapp(e.target.value)
      }} className="options form-select">
        <option defaultValue>Amount of Foam</option>
        <option value="Wet">{`Wet (Less Foam)`}</option>
        <option value="Dry">{`Dry (More Foam)`}</option>
      </select>
    ) : ""
  }


  return (
    <div>
      {renderHotorIced()}
      <select onChange={e => {
        setSize(e.target.value)
      }} className="size options form-select">
        <option defaultValue>Size</option>
        <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
        <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
        <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
      </select>
      {renderCreamOption()}
      {renderMilkOption()}
      {FlavorOption()}
      {renderCapp()}
      <select onChange={e => {
        optionValues.extra_espresso = e.target.value;
      }} className="options form-select">
        <option defaultValue>{"Extra Espresso (not required)"}</option>
        <option value="1 shot">{"1 Extra Shot"}</option>
        <option value="2 shots">{"2 Extra Shots"}</option>
        <option value="3 shots">{"3 Extra Shots"}</option>
      </select>
      {renderWhip()}
      <textarea onChange={e => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default CoffeeOptions;