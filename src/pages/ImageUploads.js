import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { uploadImageApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function ImageUploads() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.files);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
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
      Toast.fire({
        icon: "success",
        title: "Image uploaded successfully",
      });
      navigate("/order-review");
    }
  };
  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray p-4">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">Image Uploads</h1>
        </div>
        <div className="border-lightgray flex items-center p-2 rounded-lg">
          <input
            type="file"
            onChange={handleChange}
            // only jpeg file allowed don't add png jpg
            accept="image/jpeg"
          />
          {selectedFile && (
            <IoClose
              className="ml-2 cursor-pointer"
              onClick={() => setSelectedFile(null)}
            />
          )}
        </div>
        <button
          className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center mt-5"
          type="submit"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </Container>
  );
}
