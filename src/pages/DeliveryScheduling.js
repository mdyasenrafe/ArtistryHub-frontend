import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function DeliveryScheduling() {
  const [selectedDate, setSelectedDate] = useState();

  const handleContinue = () => {
    console.log(selectedDate);
  };

  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">
            Choose a Delivery Date
          </h1>
        </div>
        <div className="m-5">
          <div className="my-10">
            <input
              type="date"
              value={new Date(selectedDate)}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-300 rounded-lg w-full h-[40px] md:h-[48px] px-4"
              placeholder="Select a date"
            />
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
