import axios from "axios";
import { API } from "../utils/config";


export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}