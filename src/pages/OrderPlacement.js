import React from "react";
import { Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export default function OrderPlacement() {
  const navigation = useNavigate();

  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">Order Placement</h1>
        </div>
        <div className="m-10">
          <button
            className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center"
            type="submit"
            onClick={() => navigation("/canvas-selection")}
          >
            Place Order
          </button>
        </div>
      </div>
    </Container>
  );
}
