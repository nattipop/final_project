import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signout } from "../actions";
import exitimage from "../images/exit.png"

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
        <img className="exit" src={exitimage} width="20px" alt="close" onClick={() => toggleTrigger(false)} />
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