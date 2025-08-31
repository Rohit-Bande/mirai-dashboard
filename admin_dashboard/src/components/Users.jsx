import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const API = "https://jsonplaceholder.typicode.com/posts";

const Users = () => {
  const { myData, isLoading } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(6);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  const currentItems = myData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalItem = myData.length;
  const totalPages = Math.ceil(totalItem / rowsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlebuttonClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-5 m-5 md:grid-cols-2 sm:grid-cols-1">
            {currentItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="p-3 flex flex-col gap-4 shadow-lg rounded-xl"
                >
                  <h1 className="font-bold h-15">{item.title}</h1>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            <button
              className={`px-2 py-1 border cursor-pointer bg-blue-400 text-white rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
            >
              Prev.
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                className={`px-2 py-1 border cursor-pointer bg-blue-400 text-white rounded ${
                  currentPage === index + 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handlebuttonClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-2 py-1 border cursor-pointer bg-blue-400 text-white rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
