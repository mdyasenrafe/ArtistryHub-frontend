import axios from "axios";
import { Toast } from "../components/common/Toast";

// https://artistry-hub.onrender.com

export const url = "https://artistry-hub.onrender.com/api/";
// export const Lurl = "http://localhost:8080/api/";

const apiUrl = {
  getCanvas: "canvas/get",
  getPainting: "painting/get",
  uploadImage: "uploadImage",
  postOrder: "order/create",
  getOrders: "order/get",
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
export const getPaintingApi = async () => {
  try {
    const res = await axios.get(url + apiUrl.getPainting);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
export const uploadImageApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.uploadImage, body);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
export const PostOrderApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.postOrder, body);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
export const getIpApi = async () => {
  try {
    const url = `https://api.ipify.org/?format=json`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
export const getOrdersApi = async (ip) => {
  try {
    const getOrderUrl = `${url}${apiUrl.getOrders}?ip=${ip}`;
    const res = await axios.get(getOrderUrl);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err?.response?.data?.message,
    };
  }
};
