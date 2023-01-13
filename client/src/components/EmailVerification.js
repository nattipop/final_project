/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editUser, fetchUser } from "../actions";

const EmailVerification = () => {
  let { token } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    console.log("fetch effect ran")
    dispatch(fetchUser(token))
  }, [])
  
  useEffect(() => {
    if(user) {
      console.log("edit effect ran")
      dispatch(editUser(user._id, "confirmed_email", true))
    }
  }, [])

  const handleClick = () => {
    navigate("/")
  }
  return (
    <div style={{width: "100vw", height: "30vw"}}>
      <h1 style={{textAlign: "center", marginTop: "20vw"}}>Thank you for verifying your email! Click <span style={{color: "white"}} onClick={handleClick}>here</span> to signin</h1>
    </div>
  )
}

export default EmailVerification;