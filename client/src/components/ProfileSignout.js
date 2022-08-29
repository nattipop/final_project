import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signout } from "../actions";

const ProfileSignout = ({trigger, toggleTrigger}) => {
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
      <div className="exit" onClick={() => toggleTrigger(false)} alt="close" style={{"marginTop": "-10px"}} width="20px">x</div>
        <h2>Are you sure you want to signout?</h2>
        <div className="row">
          <p className="col signout-yes" onClick={handleYesClick}>Yes</p>
          <p className="col signout-no" onClick={() => {
            toggleTrigger(false)
            navigate(-1)
          }}>No</p>
        </div>
      </div>
    </div>
  ) : ""
}

export default ProfileSignout;