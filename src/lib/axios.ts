import axios from "axios";

// Mock a user identifier. Replace this with dynamic logic if needed.
const userId = "johndoe@example.com"; // Replace with your logic to fetch the user's unique identifier

const axiosInstance = axios.create({
    baseURL: "https://trimix-api.trimix.site", // Replace with your FastAPI backend URL
    // baseURL: "http://127.0.0.1:8000", // Replace with your FastAPI backend URL
    timeout: 2400000,
    headers: {
        "Content-Type": "application/json",
        "X-User-ID": userId, // Add the user's unique ID to every request
    },
});

// Function to handle video upload with a longer timeout
export const uploadVideo = (payload: any) => {
    return axiosInstance.post("/videos/", payload, { timeout: 2400000 }); // Timeout set to 5 minutes for this request
};

export default axiosInstance;
