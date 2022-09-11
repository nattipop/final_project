/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { editUser, fetchUser } from "../actions";
import Signout from "./Signout";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector(state => state.user.user);
  const birthday = user ? new Date(user.birthday) : undefined;
  const [clickTrigger, setClick] = useState(false)
  const [invalidDate, setInvalidDate] = useState(false)
  
  useEffect(() => {
    if(!user){
      if (token) {
        dispatch(fetchUser(token))
      } else {
        navigate("/account/signin")
      }
    }
  }, [token]);

  const renderCover = () => {
    if(user){
      return (user.picture?.cover) ? (
        <img className="cover-photo" src={user.picture.cover} alt="cover" />
      ) : (
        <img className="cover-photo" src="https://wineandblooms.com/wp-content/uploads/2019/12/WB-Create-Your-New-Year-Plant-Journal-houseplant-leaf-header.png" alt="cover" />
      )
    }
  };

  const renderProfile = () => {
    return (
      <div className="row">
        <div className="col profile-initial">{user.name.first[0]}</div>
        <p className="col profile-name row">
          <div className="col">
            <p className="profile-first" onClick={handleNameClick}>{user.name.first}</p>
            <input onBlur={handleFirstBlur} onKeyUp={handleFirstKey} className="col-1 name-input profile-first" style={{"display": "none"}} />
          </div>
          <div className="col">
            <p className="profile-last" onClick={handleNameClick}>{user.name.last}</p>
            <input onBlur={handleLastBlur} onKeyUp={handleLastKey} className="col-1 name-input profile-last" style={{"display": "none"}} />
          </div>
        </p>
      </div>
    )
  };

  const renderError = () => {
    return invalidDate ? (
      <p className="date-error">Invalid Date. Please enter valid birthday.</p>
    ) : ""
  }

  const renderBirthday = () => {
    return (user.birthday) ? (
      <div>
        <p onClick={handleDetailClick} className="profile-details">Birthday: {birthday.toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>
        <input onBlur={handleBirthdayBlur} onKeyUp={handleBirthKey} className="profile-details" style={{"display": "none"}} />
        {renderError()}
      </div>
    ) : ""
  };
  
  const handleSignout = () => {
    setClick(true)
    navigate(`/profile/${user.name.first}/signout`, { state: user })
  }

  const handleNameClick = (e) => {
    const name = e.target;
    const input = e.target.parentElement.childNodes[1];

    input.value = name.innerHTML;

    name.style.display = "none";
    input.style.display = "block";
  }

  const handleFirstKey = (e) => {
    if(e.key === "Enter"){
      handleFirstBlur(e)
    }
  }
  const handleLastKey = (e) => {
    if(e.key === "Enter"){
      handleLastBlur(e)
    }
  }
  const handleBirthKey = (e) => {
    if(e.key === "Enter"){
      handleBirthdayBlur(e)
    }
  }
  const handleEmailKey = (e) => {
    if(e.key === "Enter"){
      handleEmailBlur(e)
    }
  }
  const handleFirstBlur = (e) => {
    const input = e.target;
    const first = e.target.parentElement.childNodes[0];

    const value = input.value;
    const path = "name.first";
    dispatch(editUser(user._id, path, value))

    input.style.display = "none";
    first.style.display = "block";
  };

  const handleLastBlur = (e) => {
    const input = e.target;
    const last = e.target.parentElement.childNodes[0];

    const value = input.value;
    const path = "name.last"
    dispatch(editUser(user._id, path, value))

    input.style.display = "none";
    last.style.display = "block";
  }

  const handleDetailClick = (e) => {
    const detail = e.target;
    const input = e.target.parentElement.childNodes[1];

    if(detail.innerHTML[0] === "E") {
      input.value = detail.innerHTML.substring(7);
    }
    if(detail.innerHTML[0] === "B") {
      input.value = detail.innerHTML.substring(10)
    }

    detail.style.display = "none";
    input.style.display = "block";
  }

  const handleEmailBlur = (e) => {
    const input = e.target;
    const email = e.target.parentElement.childNodes[0];

    const value = input.value;
    const path = "login.email";
    dispatch(editUser(user._id, path, value))

    input.style.display = "none";
    email.style.display = "block";
  }

  const handleBirthdayBlur = (e) => {
    setInvalidDate(false)
    const input = e.target;
    const birthday = e.target.parentElement.childNodes[0];

    const value = new Date(input.value);
    const path = "birthday";

    // eslint-disable-next-line eqeqeq
    if(value == "Invalid Date") {
      return setInvalidDate(true)
    }

    dispatch(editUser(user._id, path, value));

    input.style.display = "none";
    birthday.style.display = "block";
  }

  return user ? (
    <div>
      <div className="back-div nav-item" style={{"width": "100%"}}>
        <div id="back-to-menu" onClick={() => navigate(-1)}>Back To Menu</div>
      </div>
      {renderCover()}
      {renderProfile()}
      <div className="detail-div">
        <p onClick={handleDetailClick} className="profile-details">Email: {user.login.email}</p>
        <input className="profile-details" onBlur={handleEmailBlur} onKeyUp={handleEmailKey} style={{"display": "none"}} />
        {renderBirthday()}
        <p className="profile-details">Role: {user.status}</p>
      </div>
      <button style={{"marginLeft": "20vw"}} className="continue-menu" onClick={handleSignout}>Signout</button>
      <Signout trigger={clickTrigger} toggleTrigger={setClick} />
    </div>
  ) : ""
}

export default Profile;