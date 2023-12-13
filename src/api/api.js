import axios from "axios";
import { Toast } from "../components/common/Toast";

// https://artistry-hub.onrender.com

export const url = "https://artistry-hub.onrender.com/api/";
export const Lurl = "http://localhost:8080/api/";

const apiUrl = {
  getCanvas: "canvas/get",
};

export const getCanvasApi = async () => {
  try {
    const res = await axios.get(url + apiUrl.getCanvas);
    return res.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
