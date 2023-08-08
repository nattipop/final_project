/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";

const EmailVerification = () => {
  const navigate = useNavigate();

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