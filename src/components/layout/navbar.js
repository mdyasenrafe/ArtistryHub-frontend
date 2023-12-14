import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    {
      id: 1,
      name: "Dashboard",
      url: "/admin-panel",
    },
  ];
  return (
    <Container>
      <div className="flex justify-between items-center w-full my-2">
        <div />
        <div className="hidden lg:flex space-x-4 items-center">
          {links.map((link) => (
            <Link to={link.url} key={link?.id} className="cursor-pointer">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
