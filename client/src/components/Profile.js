/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { editUser, fetchUser, fetchUserByEmail } from "../actions";
import Signout from "./Signout";
import UploadPic from "./UploadPic";
import edit from "../images/edit.png"

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userEmail = location.state.login.email;
  const user = useSelector(state => state.user.user);
  const birthday = user ? new Date(user.birthday) : undefined;
  const [clickTrigger, setClick] = useState(false)
  const [invalidDate, setInvalidDate] = useState(false)
  const [fileTrigger, setFileTrigger] = useState(false);
  
  useEffect(() => {
    if(!user){
      if (token) {
        dispatch(fetchUser())
      } else if (userEmail) {
        dispatch(fetchUserByEmail(userEmail))
      }
    }
  }, [token]);
  
  useEffect(() => {
    if(!user){
      navigate("/account/signin")
    }
  }, [userEmail]);

  const renderCover = () => {
    if(user){
      return (user.picture?.cover) ? (
        <img className="cover-photo" src={user.picture.cover} alt="cover" />
      ) : (
        <img className="cover-photo" src="https://wineandblooms.com/wp-content/uploads/2019/12/WB-Create-Your-New-Year-Plant-Journal-houseplant-leaf-header.png" alt="cover" />
      )
    }
  };

  const renderEditPfp = (e) => {
    const edit = e.target.parentElement.childNodes[1]
    edit.style.display = "block";
  }

  const removeEdit = (e) => {
    const edit = e.target;
    edit.style.display = "none";
  }

  const renderProfile = () => {
    if(user.picture?.profile){
      return (
        <div className="row">
          <img onMouseOver={renderEditPfp} className="profile-pic col" src={user.picture.profile} alt="profile" />
          <div onClick={() => setFileTrigger(true)} onMouseLeave={removeEdit}style={{"display": "none"}} className="editing"></div>
          <div className="col profile-name row">
            <div className="col">
              <p className="profile-first" onClick={handleNameClick}>{user.name.first}</p>
              <input onBlur={handleFirstBlur} className="profile-first col-1 name-input" style={{"display": "none"}} />
            </div>
            <div className="col">
              <p className="profile-last" onClick={handleNameClick}>{user.name.last}</p>
              <input onBlur={handleLastBlur} className="col-1 name-input profile-last" style={{"display": "none"}} />
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="row">
        <div onMouseOver={renderEditPfp} className="col profile-initial">{user.name.first[0]}</div>
        <div onClick={() => setFileTrigger(true)} onMouseLeave={removeEdit}style={{"display": "none"}} className="editing"></div>
        <p className="col profile-name row">
          <div className="col">
            <p className="profile-first" onClick={handleNameClick}>{user.name.first}</p>
            <input onBlur={handleFirstBlur} className="col-1 name-input profile-first" style={{"display": "none"}} />
          </div>
          <div className="col">
            <p className="profile-last" onClick={handleNameClick}>{user.name.last}</p>
            <input onBlur={handleLastBlur} className="col-1 name-input profile-last" style={{"display": "none"}} />
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
        <input onBlur={handleBirthdayBlur} className="profile-details" style={{"display": "none"}} />
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
      <div className="back-div">
        <div id="back-to-menu" onClick={() => navigate(-1)}>Back To Menu</div>
      </div>
      {renderCover()}
      {renderProfile()}
      <div className="detail-div">
        <p onClick={handleDetailClick} className="profile-details">Email: {user.login.email}</p>
        <input className="profile-details" onBlur={handleEmailBlur} style={{"display": "none"}} />
        {renderBirthday()}
        <p className="profile-details">Role: {user.status}</p>
      </div>
      <button style={{"marginLeft": "20vw"}} className="continue-menu" onClick={handleSignout}>Signout</button>
      <UploadPic trigger={fileTrigger} toggleTrigger={setFileTrigger} />
      <Signout trigger={clickTrigger} toggleTrigger={setClick} />
    </div>
  ) : ""
}

export default Profile;