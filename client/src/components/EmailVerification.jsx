/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editUser } from "../actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const EmailVerification = () => {
  let { userToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(
      `https://final-project-parsity.herokuapp.com/api/user`,
      {
        headers: {
        Authorization: 'Bearer ' + userToken,
      }
      }
    ).then(res => {
      setUser(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
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