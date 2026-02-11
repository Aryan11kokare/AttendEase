import axios from "axios";

export const clientServer = axios.create({
  baseURL: "https://attendease-prjv.onrender.com",
});
