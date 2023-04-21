import React from "react";
import Container from "./components/layout/Container";

type Props = {};

const Loading = (props: Props) => {
  return (
    <Container>
      <div
        className="bg-gray grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 gap-8"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <div className="flex flex-col " key={num}>
            <div
              className="animate-pulse bg-neutral-200 w-70 h-72  rounded overflow-hidden border cursor-pointer"
              key={num}
            >
              {" "}
            </div>
            <div
              className="animate-pulse bg-neutral-200 w-70 h-3 mt-2 rounded overflow-hidden border cursor-pointer"
              key={num}
            >
              {" "}
            </div>
            <div
              className="animate-pulse bg-neutral-200 w-70 h-3 mt-2 rounded overflow-hidden border cursor-pointer"
              key={num}
            >
              {" "}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Loading;
