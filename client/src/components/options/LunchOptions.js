const LunchOptions = ({product}) => {
  return (
    <div>
      <select className="options form-select">
        <option defaultValue>Serving Size</option>
        <option value="Half">Half - $8.99</option>
        <option value="Whole">Whole - $10.49</option>
      </select>
      <select className="options form-select">
        <option defaultOption>Panini or Wrap</option>
        <option value="Panini">Panini</option>
        <option value="Wrap">Wrap</option>
      </select>
      <select className="options form-select">
        <option defaultValue>Side</option>
        <option value="Kettle Chips">Kettle Chips</option>
        <option value="5 Bean Salad">5 Bean Salad</option>
        <option value="Cottage Cheese">Cottage Cheese</option>
      </select>
      <textarea className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default LunchOptions;