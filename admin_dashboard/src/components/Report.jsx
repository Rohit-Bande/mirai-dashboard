import React from "react";
import { useOutletContext } from "react-router-dom";

const Report = () => {
  const { myData, isLoading } = useOutletContext();

  return (
    <div>
      <h1 className="grid grid-cols-3">
        {myData.map((item) => (
          <div>
            <h1>{item.title}</h1>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default Report;
