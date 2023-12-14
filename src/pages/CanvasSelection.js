import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCanvasApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import Spinner from "../components/common/Spinner";
import StyleOptions from "./StyleOptions";
import DeliveryScheduling from "./DeliveryScheduling";
import OrderPlacement from "./OrderPlacement";
import ImageUploads from "./ImageUploads";
import OrderReview from "./OrderReview";
import Navbar from "../components/layout/Navbar";

export default function CanvasSelection() {
  const navigation = useNavigate();
  const [canvas, setCanvas] = useState([]);
  const [selectedCanvas, setSelectedCanvas] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [orderData, setOrderData] = useState({});

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
      // navigation("/style-options");
      setStep(1);
      setOrderData({
        ...orderData,
        canvas: selectedCanvas,
      });
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        {step === 0 ? (
          <div className="rounded-lg bg-white mt-6 border-lightgray">
            <div className="py-4 border-b">
              <h1 className="font-bold text-2xl text-center">
                Canvas Selection
              </h1>
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
        ) : step === 1 ? (
          <StyleOptions
            setStep={setStep}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        ) : step === 2 ? (
          <DeliveryScheduling
            setStep={setStep}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        ) : step === 3 ? (
          <ImageUploads
            setStep={setStep}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        ) : (
          step === 4 && <OrderReview orderData={orderData} />
        )}
      </Container>
    </>
  );
}
