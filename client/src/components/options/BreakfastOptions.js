import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../../actions";

const BreakfastOptions = ({product}) => {
  const [meat, setMeat] = useState(undefined);
  const [secondMeat, setSecondMeat] = useState(undefined);
  const [cheese, setCheese] = useState(undefined);
  const [addVeggies, setAddVeggies] = useState(false)
  const [addPB, setAddPB] = useState(false);
  const [breadOption, setBreadOption] = useState(undefined);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let price = product.price.Any.$numberDecimal || undefined
  let decimal = Number(price);

  let optionValues = {
    title: product.title,
    net_price: price,
    meat: meat,
    second_meat: secondMeat,
    cheese: cheese,
    bread: breadOption,
    addVeggies: addVeggies ? "Add Veggies" : undefined,
    addPB: addPB ? "Add Peanut Butter" : undefined,
    notes: undefined,
    price: undefined
  }

  const handleAddToCart = () => {
    if(!optionValues.meat && product.title !== "Anchors Away Oatmeal"){
      return alert("Please choose a Meat Option")
    }
    if(!optionValues.second_meat && product.title === "Big Boys Sandwich"){
      return alert("Please choose a Second Meat Option")
    }
    if(!optionValues.cheese && product.title !== "Anchors Away Oatmeal"){
      return alert("Please choose a Cheese Option")
    }
    if(!optionValues.bread && product.title !== "Anchors Away Oatmeal"){
      return alert("Please choose a Bread Option")
    }

    if(optionValues.addVeggies === "Add Veggies"){
      decimal += 1.5
    }
    if(optionValues.addPB === "Add Peanut Butter"){
      decimal += 0.25
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

  const renderSecondOption = () => {
    return (product.title === "Big Boys Sandwich") ? (
      <div>
        <select onChange={e => setSecondMeat(e.target.value)} className="options form-select">
          <option defaultValue>Second Meat Option</option>
          <option value="Ham">Ham</option>
          <option value="Bacon">Bacon</option>
          <option value="Sausage">Sausage</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>
    ) : ""
  }

  return (product.title === "Anchors Away Oatmeal") ? (
    <div>
      <div className="form-check options">
        <input onChange={() => setAddPB(!addPB)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" for="flexCheckDefault">
          Add Peanut Butter
        </label>
      </div>
      <textarea className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div className="add-to-cart">Add to Cart</div>
    </div>
  ) : (
    <div>
      <select onChange={(e) => setBreadOption(e.target.value)} className="options form-select">
        <option defaultValue>Bread Options</option>
        <option value="Crossiant">Crossiant</option>
        <option value="Wrap">Wrap</option>
        <option value="Plain">Plain Bagel</option>
        <option value="Asiago Bagel">Asiago Bagel</option>
        <option value="Cheddar Herb Bagel">Cheddar Herb Bagel</option>
        <option value="Apple Cinnamon Bagel">Apple Cinnamon Bagel</option>
      </select>
      <select onChange={((e) => setMeat(e.target.value))} className="options form-select">
        <option defaultValue>Meat Options</option>
        <option value="Bacon">Bacon</option>
        <option value="Ham">Ham</option>
        <option value="Sausage">Sausage</option>
        <option value="Turkey">Turkey</option>
      </select>
      {renderSecondOption()}
      <select onChange={(e) => setCheese(e.target.value)} className="options form-select">
        <option defaultValue>Cheese Options</option>
        <option value="Cheddar">Cheddar</option>
        <option value="Provolone">Provolone</option>
      </select>
      <div className="form-check options">
        <input onChange={() => setAddVeggies(!addVeggies)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" for="flexCheckDefault">
          Add Veggies - $1.50
        </label>
      </div>
      <textarea onChange={(e) => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default BreakfastOptions;