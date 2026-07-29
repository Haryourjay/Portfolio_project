import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api"
});

export const getPortfolioVideos = () => API.get("/portfolio/");

export const getShowcaseVideos = () => API.get("/showcase/");