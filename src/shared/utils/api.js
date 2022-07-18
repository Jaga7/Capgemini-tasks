import axios from "axios";

const mode = "dev";
const URL = mode === "dev" ? "http://localhost" : "";
const PORT = 3000;
const baseURL = `${URL}:${PORT}`;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
