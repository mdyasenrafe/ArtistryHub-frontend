import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { CiMenuBurger } from "react-icons/ci";
import { GrProjects } from "react-icons/gr";
import { getOrdersApi } from "../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUniqueId, saveUniqueId } from "../utils/uniqueIdentifiers";
import TableRowCard from "../components/TableRowCard";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

export default function AdminPanel(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [NoProjects, setNoProjects] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Projects"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GrProjects />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <CiMenuBurger />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            home
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
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
      </Box>
    </Box>
  );
}
