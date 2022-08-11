import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }
}