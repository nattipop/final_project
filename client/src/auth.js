import axios from "axios"
const BASE_URL = "http//:localhost:3000"

const AuthProvider = {
  isAuthenticated: false,
  signin: ((user) => {
    axios.post(`${BASE_URL}/auth/signin`, user)

    const token = localStorage.getItem("token")
    if(token){
      AuthProvider.isAuthenticated = true;
    }
  }),
  signout: (() => {
    AuthProvider.isAuthenticated = false
  })
};

export { AuthProvider };