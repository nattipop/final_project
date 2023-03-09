import { useLocation } from "react-router";

const PaymentForm = () => {
  const location = useLocation();
  const info = location.state;
  console.log(info)

  const renderCartItems = () => {
    if(info.items[0]) {
      return info.items.map(product => {
        return (
          <div className="product row">
            <img
              src={product.picture}
              alt="product"
              className="col image-prod"
            />
            <div className="description col">
              <h3>{product.title}</h3>
              <h5>${product.price}</h5>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <section>
      {renderCartItems()}
      <form action="/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>
    </section>
  )
}

export default PaymentForm;