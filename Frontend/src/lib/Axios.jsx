import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default Axios;
