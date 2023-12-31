import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Toast } from "../components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function DeliveryScheduling() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleContinue = () => {
    if (!selectedDate) {
      Toast.fire({
        icon: "error",
        title: "Please select a date",
      });
      return;
    }
    const date = selectedDate.format("YYYY-MM-DD");
    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      const data = JSON.parse(orderData);
      data.deliveryDate = date;
      localStorage.setItem("orderData", JSON.stringify(data));
    }
    navigate("/image-uploads");
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  useEffect(() => {
    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      const data = JSON.parse(orderData);
      if (data.deliveryDate) {
        setSelectedDate(dayjs(data.deliveryDate));
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
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="p-4 border-b">
          <h1 className="font-bold text-2xl text-center">
            Choose a Delivery Date
          </h1>
        </div>
        <div className="m-5 mb-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DatePicker",
                "MobileDatePicker",
                "DesktopDatePicker",
                "StaticDatePicker",
              ]}
            >
              <DemoItem label="Choose a date">
                <DatePicker value={selectedDate} onChange={handleDateChange} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <button
            className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center mt-5"
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
