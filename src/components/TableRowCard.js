import { TableRow } from "@mui/material";
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import ProjectViewModal from "./modals/ProjectViewModal";

export default function TableRowCard({ row }) {
  const [showModal, setShowModal] = useState(false);
  const showData = {
    id: row?._id,
    canvas: row?.canvas,
    painting: row?.painting,
    deliveryDate: new Date(row?.deliveryDate).toLocaleDateString(),
    image: row?.image,
  };
  return (
    <>
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row?.canvas}
        </TableCell>
        <TableCell align="right">{row?.painting}</TableCell>
        <TableCell align="right">
          {new Date(row?.deliveryDate).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            View
          </button>
        </TableCell>
      </TableRow>
      {showModal && (
        <ProjectViewModal setShow={setShowModal} orderData={showData} />
      )}
    </>
  );
}
