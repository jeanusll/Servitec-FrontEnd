import axios from "./axios";
import Cookies from "js-cookie";

//create
export const registerRequest = async (user) =>
  axios.post("/api/user/register", user);

export const loginRequest = async (user) => axios.post("/api/user/login", user);

export const verifyTokenRequest = async () => axios.get("/api/user/verify");

export const logoutRequest = async () => axios.post("/api/user/logout");
