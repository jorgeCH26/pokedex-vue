import axios from "axios";

export const gptApi = axios.create({
    baseURL: "http://localhost:3000/gpt/",
})