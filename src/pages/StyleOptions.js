import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getpaintingsApi, getPaintingApi } from "../api/api";
import { Toast } from "../components/common/Toast";
import Spinner from "../components/common/Spinner";

export default function StyleOptions() {
  const navigation = useNavigate();
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      navigation("/delivery-scheduling");
    }
  };

  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="py-4 border-b">
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
                    className="flex mb-2 items-center cursor-pointer"
                    onClick={() => setSelectedPainting(item.value)}
                  >
                    <div
                      className={`flex items-center w-6 h-6 border justify-center mr-2 rounded-full ${
                        selectedPainting === item.value
                          ? "border-[#3c7fff]"
                          : "border-gray-300"
                      }`}
                    >
                      <div
                        className={`${
                          selectedPainting === item.value
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
