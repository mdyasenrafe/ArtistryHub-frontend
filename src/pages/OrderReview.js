import { Container } from "@mui/material";
import React, { useState } from "react";
import Spinner from "../components/common/Spinner";
import { PostOrderApi } from "../api/api";
import Swal from "sweetalert2";
import { Toast } from "../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { getUniqueId, saveUniqueId } from "../utils/uniqueIdentifiers";

export default function OrderReview({ orderData }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const submitOrder = async () => {
    setIsLoading(true);
    let id = getUniqueId();
    if (id) {
    } else {
      id = saveUniqueId();
    }
    orderData["uniqueId"] = id;
    console.log(orderData);
    const res = await PostOrderApi(orderData);
    if (res.error) {
      Toast.fire({
        icon: "error",
        title: res.message,
      });
      setIsLoading(false);
      return;
    } else {
      Swal.fire({
        title: "Order Placed",
        text: "Your order has been placed successfully",
        icon: "success",
      }).then(() => {
        navigation("/admin-panel");
      });
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray p-2">
        <div className="py-4 border-b">
          <h1 className="font-bold text-2xl text-center">Order Summary</h1>
        </div>
        <div className="p-2 border-lightgray my-5">
          <h1 className="font-bold text-xl mb-4">Project 1</h1>
          {Object.keys(orderData).map((item) => (
            <div className="flex justify-between items-center">
              <p>{item}: </p>
              {item === "image" ? (
                <div>
                  <img
                    src={orderData?.image}
                    className="w-[100px] h-[100px] object-cover rounded-lg"
                    alt=""
                  />
                </div>
              ) : (
                <p>{orderData[item]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center "
          type="submit"
          onClick={submitOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner color="white" fill={"white"} />
          ) : (
            "Submit Order"
          )}
        </button>
      </div>
    </Container>
  );
}
