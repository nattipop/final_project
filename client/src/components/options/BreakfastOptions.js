const BreakfastOptions = ({product}) => {
  const renderSecondOption = () => {
    return (product.title === "Big Boys Sandwich") ? (
      <div>
        <label>Second Meat Option:</label>
        <select className="options form-select">
          <option defaultValue>Ham</option>
          <option value="Bacon">Bacon</option>
          <option value="Sausage">Sausage</option>
          <option value="Turkey">Turkey</option>
        </select>
      </div>
    ) : ""
  }

  return (product.title === "Anchors Away Oatmeal") ? (
    <div>
      <div class="form-check options">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Add Peanut Butter
        </label>
      </div>
      <textarea className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div className="add-to-cart">Add to Cart</div>
    </div>
  ) : (
    <div>
      <select className="options form-select">
        <option defaultValue>Crossiant</option>
        <option value="Wrap">Wrap</option>
        <option value="Plain">Plain Bagel</option>
        <option value="Asiago Bagel">Asiago Bagel</option>
        <option value="Cheddar Herb Bagel">Cheddar Herb Bagel</option>
        <option value="Apple Cinnamon Bagel">Apple Cinnamon Bagel</option>
      </select>
      <select className="options form-select">
        <option defaultOption>Bacon</option>
        <option value="Ham">Ham</option>
        <option value="Sausage">Sausage</option>
        <option value="Turkey">Turkey</option>
      </select>
      {renderSecondOption()}
      <select className="options form-select">
        <option defaultValue>Cheddar</option>
        <option value="Provolone">Provolone</option>
      </select>
      <div class="form-check options">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
          Add Veggies - $1.50
        </label>
      </div>
      <textarea className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default BreakfastOptions;