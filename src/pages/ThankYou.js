import { Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigator = useNavigate();
  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray py-4">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">
            Thank you for your order
          </h1>
        </div>
        <div>
          <img
            src="https://i.ibb.co/LhG7Jth/image.png"
            alt="thank you"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="h-[40px] md:h-[48px] bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center w-[95%]"
            type="submit"
            onClick={() => {
              navigator("/");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </Container>
  );
}
