import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCanvasApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import Spinner from "../components/common/Spinner";
import StyleOptions from "./StyleOptions";
import DeliveryScheduling from "./DeliveryScheduling";
import ImageUploads from "./ImageUploads";
import OrderReview from "./OrderReview";
import Navbar from "../components/layout/Navbar";

export default function CanvasSelection() {
  const [canvas, setCanvas] = useState([]);
  const [selectedCanvas, setSelectedCanvas] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCanvas();
  }, []);
  const fetchCanvas = async () => {
    const res = await getCanvasApi();
    if (res.error) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: res.message,
      });
    } else {
      setIsLoading(false);
      setCanvas(res.data);
    }
  };
  const handleContinue = () => {
    if (selectedCanvas === "") {
      Toast.fire({
        icon: "error",
        title: "Please select a canvas",
      });
    } else {
      const orderData = {
        canvas: selectedCanvas,
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
      navigate("/style-options");
    }
  };

  useEffect(() => {
    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      const data = JSON.parse(orderData);
      if (data?.canvas) {
        setSelectedCanvas(data.canvas);
      }
    }
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <div className="rounded-lg bg-white mt-6 border-lightgray">
          <div className="py-4 border-b">
            <div>
              <h1 className="font-bold text-2xl text-center">
                Canvas Selection
              </h1>
              <div />
            </div>
          </div>
          <div className="m-5">
            <div>
              {isLoading ? (
                <div className="flex justify-center items-center h-[200px]">
                  <Spinner />
                </div>
              ) : (
                <div className="my-10">
                  {canvas.map((item) => (
                    <div
                      key={item.value}
                      className="flex mb-2 items-center cursor-pointer"
                      onClick={() => setSelectedCanvas(item.label)}
                    >
                      {/* select */}
                      <div
                        className={`flex items-center w-6 h-6 border justify-center mr-2 rounded-full ${
                          selectedCanvas === item.label
                            ? "border-[#3c7fff]"
                            : "border-gray-300"
                        }`}
                      >
                        <div
                          className={`${
                            selectedCanvas === item.label
                              ? "bg-[#3c7fff]"
                              : "bg-white"
                          } border border-gray-300 w-4 h-4 rounded-full flex justify-center items-center`}
                        />
                      </div>
                      <h1 className="font-bold text-xl">{item.label}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center"
              type="submit"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
