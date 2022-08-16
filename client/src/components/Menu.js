import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts } from "../actions";
import SetTime from "./SetTime";
import Signout from "./Signout";

const Menu = () => {
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);
  const products = useSelector(state => state.products)
  const [signoutTrigger, setSignout] = useState(false)
  const [createTrigger, setCreate] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderProducts = () => {
    return products.map((product, i) => {
      return product ? (
        <div className="card col" key={i}>
          <img src={product.picture} alt="product" />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ) : ""
    })
  }
  
  return (authenticated) ? (
    <div>Menu
      <button onClick={() => {
        navigate("signout")
        setSignout(true)
      }}>Signout</button>
      <button onClick={() => {
        navigate("/set-time")
        setCreate(true)
      }}>Create Order</button>
      <div className="row d-flex justify-content-center product-div">
        {renderProducts()}
      </div>
      <Signout trigger={signoutTrigger} toggleTrigger={setSignout} />
      <SetTime trigger={createTrigger} toggleTrigger={setCreate} />
    </div>
  ) : (
    <div>Menu
      <button onClick={() => navigate("/account/signin")}>Signin</button>
      <div className="row d-flex justify-content-center product-div">
        {renderProducts()}
      </div>
    </div>
  )
}

export default Menu;
