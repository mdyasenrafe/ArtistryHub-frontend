import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getOrdersApi } from "../../api/api";
import Spinner from "../../components/common/Spinner";
import TableRowCard from "../../components/TableRowCard";
import { getUniqueId, saveUniqueId } from "../../utils/uniqueIdentifiers";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [NoProjects, setNoProjects] = useState(false);

  useEffect(() => {
    const id = getUniqueId();
    if (id) {
      setUniqueId(id);
    } else {
      const newId = saveUniqueId();
      setUniqueId(newId);
    }
  }, []);

  useEffect(() => {
    if (uniqueId) {
      fetchProjects();
    }
  }, [uniqueId]);
  const fetchProjects = async () => {
    const response = await getOrdersApi(uniqueId);
    if (response.error) {
      setIsLoading(false);
      return;
    } else {
      if (response.data.length > 0) {
        setProjects(response.data);
        setIsLoading(false);
        setNoProjects(false);
      } else {
        setNoProjects(true);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>
      </div>
      {/* show table wise */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Spinner color="blue-500" size="30px" className="animate-spin" />
        </div>
      ) : NoProjects ? (
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl">No Projects Found</h1>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Canvas</TableCell>
                <TableCell align="right">Painting</TableCell>
                <TableCell align="right">Delivery Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => (
                <TableRowCard row={row} key={row._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
