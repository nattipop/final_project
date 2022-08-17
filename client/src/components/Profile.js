import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Signout from "./Signout";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;
  const birthday = new Date(user.birthday);
  const [clickTrigger, setClick] = useState(false)
  console.log(user)

  const renderCover = () => {
    return (user.picture?.cover) ? (
      <img className="cover-photo" src={user.picture.cover} alt="cover" />
    ) : (
      <img className="cover-photo" src="https://wineandblooms.com/wp-content/uploads/2019/12/WB-Create-Your-New-Year-Plant-Journal-houseplant-leaf-header.png" alt="cover" />
    )
  };

  const renderProfile = () => {
    return (user.picture?.profile) ? (
      <div className="row">
        <img className="profile-pic col" src={user.picture.profile} alt="profile" />
        <p className="col profile-name">{user.name.first} {user.name.last}</p>
      </div>
    ) : (
      <div className="row">
        <div className="col profile-initial">{user.name.first[0]}</div>
        <p className="col profile-name">{user.name.first} {user.name.last}</p>
      </div>
    )
  };

  const renderBirthday = () => {
    return (user.birthday) ? (
      <p className="profile-details">Birthday: {birthday.toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>
    ) : ""
  };
  
  const handleSignout = () => {
    setClick(true)
    navigate(`/profile/${user.name.first}/signout`, { state: user })
  }

  return (
    <div>
      <div className="back-div">
        <div id="back-to-menu" onClick={() => navigate(-1)}>Back To Menu</div>
      </div>
      {renderCover()}
      {renderProfile()}
      <div className="detail-div">
        <p className="profile-details">Email: {user.login.email}</p>
        {renderBirthday()}
        <p className="profile-details">Role: {user.status}</p>
      </div>
      <button className="profile-details" onClick={handleSignout}>Signout</button>
      <Signout trigger={clickTrigger} toggleTrigger={setClick} />
    </div>
  )
}

export default Profile;