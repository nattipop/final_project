import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchAvailable } from "../actions";
import Signout from "./Signout";

const OrderMenu = () => {
  const location = useLocation();
  const date = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerSignout, setTrigger] = useState(false);
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.user[0]);
  const time = date.toLocaleTimeString("it-IT")

  useEffect(() => {
    dispatch(fetchAvailable(time))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignout = () => {
    setTrigger(true)
    navigate("/order-menu/signout", {state: date});
  }

  const handleItemClick = (e) => {
    let title = e.target.parentElement.childNodes[1].innerHTML
    if(e.target.classList.contains("card")){
      title = e.target.childNodes[1].innerHTML;
    }

    const item = products.find(product => {
      return product.title === title
    })

    navigate(`/menu/${item.category}/${item._id}`, { state: item })
  }

  const renderProducts = () => {
    return products.map((product, i) => {
      return product ? (
        <div onClick={handleItemClick} className="card col" key={i}>
          <img src={product.picture} alt="product" />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
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

  return (
    <div>
      <div style={{ "width": "70px", "float": "right", "height": "70px" }}>
        {renderPfp()}
      </div>
      <button onClick={handleSignout}>Signout</button>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3 className="pickup-time">{`Your scheduled pickup time: ${date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit'})}`}</h3>
      <h2 className="available-items">Available Items:</h2>
      <div className="row d-flex justify-content-center product-div">
        {renderProducts()}
      </div>
      <Signout trigger={triggerSignout} toggleTrigger={setTrigger} />
    </div>
  )
}

export default OrderMenu;