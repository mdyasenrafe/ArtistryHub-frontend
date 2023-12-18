import axios from "axios";
import { Toast } from "../components/common/Toast";

// https://artistry-hub.onrender.com

export const url = "https://artistry-hub.onrender.com/api/";
export const Lurl = "http://localhost:8080/api/";

const apiUrl = {
  getCanvas: "canvas/get",
  getPainting: "painting/get",
  uploadImage: "uploadImage",
  postOrder: "order/create",
  getOrders: "order/get",
  createPage: "page/create",
  getPages: "page/get",
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
export const getOrdersApi = async (uniqueId) => {
  try {
    const getOrderUrl = `${url}${apiUrl.getOrders}?uniqueId=${uniqueId}`;
    const res = await axios.get(getOrderUrl);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err?.response?.data?.message,
    };
  }
};

export const CreatePageApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.createPage, body);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err.response.data.message,
    };
  }
};
export const getPagesApi = async () => {
  try {
    const getPageUrl = `${url}${apiUrl.getPages}`;
    const res = await axios.get(getPageUrl);
    return res.data;
  } catch (err) {
    return {
      error: err,
      message: err?.response?.data?.message,
    };
  }
};
