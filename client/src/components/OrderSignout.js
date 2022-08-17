import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signout } from "../actions";

const OrderSignout = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYesClick = () => {
    toggleTrigger(false)
    dispatch(signout(() => navigate("/")));
  }

  console.log(trigger)
  
  return (trigger) ? (
    <div className="popup-outer">
      <div className="popup-inner">
        <button onClick={() => toggleTrigger(false)}>Close</button>
        <h2>Are you sure you want to signout?</h2>
        <button onClick={handleYesClick}>Yes</button>
        <button onClick={() => {
          toggleTrigger(false)
          navigate(-1)
        }}>No</button>
      </div>
    </div>
  ) : ""
}

export default OrderSignout;