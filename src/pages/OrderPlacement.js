import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getUniqueId, saveUniqueId } from "../utils/uniqueIdentifiers";

export default function OrderPlacement() {
  const navigation = useNavigate();

  useEffect(() => {
    const id = getUniqueId();
    if (id) {
    } else {
      saveUniqueId();
    }
  }, []);

  return (
    <Container>
      <Navbar />
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
