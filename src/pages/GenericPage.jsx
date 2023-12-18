import { Container } from "@mui/material";
import parse from "html-react-parser";
import React from "react";

export default function GenericPage({ page }) {
  console.log(page);
  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray py-4">
        <div className="pb-4 border-b border-b-gray-300">
          <h1 className="font-bold text-2xl text-center">{page?.title}</h1>
        </div>
        <div className="p-4">
          <div>
            <img
              src={page?.banner}
              alt={page?.title}
              className="w-full rounded-lg"
            />
          </div>
          {page?.description &&
            parse(`<div class="mt-4 description">${page?.description}</div>`)}

          <div>
            {page?.icons.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold text-xl">Icons</h2>
                <div className="mt-4 flex flex-wrap">
                  {page?.icons.map((icon, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center mr-4 mb-4"
                    >
                      <img
                        src={icon}
                        alt={icon}
                        className="rounded-full h-16 w-16"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
