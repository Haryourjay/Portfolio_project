import axios from "axios";

const API = axios.create({
    baseURL: "https://haryour.pythonanywhere.com/api/v1"
});

export const getPortfolioVideos = () => API.get("/portfolio/");

export const getShowcaseVideos = () => API.get("videos/showcase");

export const sendEmail = (data) => API.get('contacts/', data)