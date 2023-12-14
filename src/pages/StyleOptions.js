import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaintingApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import Spinner from "../components/common/Spinner";
import { IoArrowBack } from "react-icons/io5";

export default function StyleOptions() {
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPainting();
  }, []);

  const fetchPainting = async () => {
    const res = await getPaintingApi();
    if (res.error) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: res.message,
      });
    } else {
      setIsLoading(false);
      setPaintings(res.data);
    }
  };
  const handleContinue = () => {
    if (selectedPainting === "") {
      Toast.fire({
        icon: "error",
        title: "Please select a paintings",
      });
    } else {
      const orderData = localStorage.getItem("orderData");
      if (orderData) {
        const data = JSON.parse(orderData);
        data.painting = selectedPainting;
        localStorage.setItem("orderData", JSON.stringify(data));
      }
      navigate("/delivery-scheduling");
    }
  };

  useEffect(() => {
    const orderData = localStorage.getItem("orderData");
    console.log(orderData);
    if (orderData) {
      const data = JSON.parse(orderData);
      if (data?.painting) {
        setSelectedPainting(data?.painting);
      } else if (data?.canvas == "") {
        navigate("/canvas-selection");
      }
    } else {
      navigate("/canvas-selection");
    }
  }, []);

  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="p-4 border-b">
          <h1 className="font-bold text-2xl text-center">Choose a painting</h1>
        </div>
        <div className="m-5">
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <Spinner />
              </div>
            ) : (
              <div className="my-10">
                {paintings.map((item) => (
                  <div
                    key={item.value}
                    className="flex mb-2 items-center cursor-pointer"
                    onClick={() => setSelectedPainting(item.label)}
                  >
                    <div
                      className={`flex items-center w-6 h-6 border justify-center mr-2 rounded-full ${
                        selectedPainting === item.label
                          ? "border-[#3c7fff]"
                          : "border-gray-300"
                      }`}
                    >
                      <div
                        className={`${
                          selectedPainting === item.label
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
  );
}
