import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { uploadImageApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";

export default function ImageUploads() {
  const navigate = useNavigate();
  let DemoImage = "https://i.ibb.co/sjZ57Dp/Group-1295.png";
  let camera = "https://i.ibb.co/yy0WSVg/Group-1098.png";
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      let size = e.target.files[0].size / 1024 / 1024;
      if (size > 1) {
        Toast.fire({
          icon: "error",
          title: "File size is too large",
        });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const handleContinue = async () => {
    if (!selectedFile) {
      Toast.fire({
        icon: "error",
        title: "Please select a file",
      });
      return;
    }
    const res = await uploadImageApi({ file: selectedFile });
    if (res.error) {
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
      return;
    } else {
      setLoading(false);
      const orderData = localStorage.getItem("orderData");
      if (orderData) {
        const data = JSON.parse(orderData);
        data.image = res?.secure_url;
        localStorage.setItem("orderData", JSON.stringify(data));
      }
      navigate("/order-review");
    }
  };

  const handlePickFile = (id) => {
    const bannerInput = document.getElementById(id);
    bannerInput.click();
  };

  useEffect(() => {
    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      const data = JSON.parse(orderData);
      if (data?.image) {
        setSelectedFile(data?.image);
      } else if (!data?.deliveryDate) {
        navigate("/delivery-scheduling");
      } else if (!data?.painting) {
        navigate("/style-options");
      } else if (!data?.canvas) {
        navigate("/canvas-selection");
      }
    } else {
      navigate("/canvas-selection");
    }
  }, []);

  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray py-4">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">Image Uploads</h1>
        </div>
        <div
          onClick={() => handlePickFile("profile_photo_picker")}
          className="border-lightgray flex justify-center items-center p-2 rounded relative cursor-pointer"
        >
          <div className="relative w-[100px] h-[100px] justify-center flex items-center bg-white border border-[#E1E1E1]  rounded-[800px]">
            <input
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
              id="profile_photo_picker"
              onChange={handleChange}
            />
            <img
              className={selectedFile ? "w-[95px] h-[95px] rounded-[50px]" : ""}
              src={selectedFile ? selectedFile : DemoImage}
              alt=""
            />
            <div className="absolute bottom-0 right-0">
              <img src={camera} alt="" className="w-[30px] h-[30px]" />
            </div>
          </div>
        </div>

        <button
          className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center mt-5"
          type="submit"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? <Spinner color="white" fill={"white"} /> : "Continue"}
        </button>
      </div>
    </Container>
  );
}
