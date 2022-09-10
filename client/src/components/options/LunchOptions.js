import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../../actions";

const LunchOptions = ({product}) => {
  const [servingSize, setServingSize] = useState(undefined);
  const [side, setSide] = useState(undefined);
  const [bread, setBread] = useState(undefined);
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let price = (servingSize) ? product.price[servingSize].$numberDecimal : undefined
  let decimal = Number(price);

  let optionValues = {
    availability: {
      start: product.availability.start,
      end: product.availability.end
    },
    title: product.title,
    net_price: price,
    size: servingSize,
    side: side,
    bread: bread,
    notes: undefined,
    price: undefined,
    picture: product.picture,
    product_id: product.product_id
  }

  const handleAddToCart = () => {
    if(!optionValues.size){
      return alert("Please choose a Serving Size")
    }
    if(!optionValues.side){
      return alert("Please choose a Side")
    }
    if(!optionValues.bread){
      return alert("Please choose Panini or Wrap")
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

  return (
    <div>
      <select onChange={e => setServingSize(e.target.value)} className="options form-select">
        <option defaultValue>Serving Size</option>
        <option value="Half">Half - $8.99</option>
        <option value="Whole">Whole - $10.49</option>
      </select>
      <select onChange={e => setBread(e.target.value)} className="options form-select">
        <option defaultOption>Panini or Wrap</option>
        <option value="Panini">Panini</option>
        <option value="Wrap">Wrap</option>
      </select>
      <select onChange={e => setSide(e.target.value)} className="options form-select">
        <option defaultValue>Side</option>
        <option value="Kettle Chips">Kettle Chips</option>
        <option value="5 Bean Salad">5 Bean Salad</option>
        <option value="Cottage Cheese">Cottage Cheese</option>
      </select>
      <textarea onChange={e => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default LunchOptions;