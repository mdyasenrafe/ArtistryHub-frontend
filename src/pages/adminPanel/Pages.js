import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Pages() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div />
        <h1 className="text-2xl"> Pages</h1>
        <div
          className="w-[30px] h-[30px] rounded-full my-2 flex justify-center items-center border border-[#3c7fff]"
          onClick={() => navigate("/admin-panel/pages/add-page")}
        >
          <FaPlus className="text-[#3c7fff]" />
        </div>
      </div>
    </div>
  );
}
