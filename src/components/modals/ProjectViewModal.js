import React from "react";
import { GrClose } from "react-icons/gr";

export default function ProjectViewModal({ setShow, orderData }) {
  return (
    <div className="center_view">
      <div className="modal_view  edit_modal_view py-[20px] px-[24px] w-full">
        <div className="overflow-auto">
          <div className="flex justify-end">
            {/* close icon */}
            <GrClose
              size={20}
              className="cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>
          <div className="mt-5">
            {Object.keys(orderData).map((item) => (
              <div className="flex justify-between items-center mb-1">
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
        </div>
      </div>
    </div>
  );
}
