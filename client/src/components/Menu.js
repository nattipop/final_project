import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchProducts, fetchUserByEmail } from "../actions";
import SetTime from "./SetTime";
import Signout from "./Signout";

const Menu = () => {
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);
  const userEmail = useSelector(state => state.auth.email)
  const products = useSelector(state => state.products)
  const user = useSelector(state => state.user[0])
  const [signoutTrigger, setSignout] = useState(false)
  const [createTrigger, setCreate] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
   if(userEmail){
      dispatch(fetchUserByEmail(userEmail))
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  const renderProducts = () => {
    return products.map((product, i) => {
      return product ? (
        <div className="card col" key={i}>
          <img src={product.picture} alt="product" />
          <h3>{product.title}</h3>
          <p>starting at ${product.price}</p>
          <p>{product.description}</p>
        </div>
      ) : ""
    })
  }

  const handlePfpClick = () => {
    navigate(`/profile/${user.name.first}`, { state: user })
  }

  const renderPfp = () => {
    const pfp = user.picture?.profile || null;
    const initial = user.name.first[0];

    return pfp ? (
      <div className="pfp">
        <img onClick={handlePfpClick} src={pfp} alt={initial} />
      </div>
    ) : (
      <div className="pfp">
        <div onClick={handlePfpClick}>{initial}</div>
      </div>
    )
  }

  return (authenticated && user) ? (
    <div>
      <div style={{ "width": "70px", "float": "right", "height": "70px" }}>
        {renderPfp()}
      </div>
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
      <button onClick={() => navigate("/account/signup")}>Signup</button>
      <button onClick={() => navigate("/account/signin")}>Signin</button>
      <div className="row d-flex justify-content-center product-div">
        {renderProducts()}
      </div>
    </div>
  )
}

export default Menu;
