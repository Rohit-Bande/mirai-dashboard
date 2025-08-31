import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";

const API = "https://jsonplaceholder.typicode.com/posts";

const Dashboard = () => {
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
      setMyData(data);
    } catch (error) {
      setMyData(<Error />);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = myData.filter((item) =>
    item.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  const navigate = useNavigate();

  const navigateRoute = () => {
    navigate("/report");
  };

  const navigateUsers = () => {
    navigate("/users");
  };

  return (
    <>
      <div className="grid lg:grid-cols-[.3fr_1fr] md:grid-cols-1 h-screen">
        <div className="hidden lg:flex bg-yellow-400 h-full justify-center items-center">
          <ul className="flex gap-7 font-bold uppercase flex-col text-2xl items-center">
            <li>Dashboard</li>
            <li className="cursor-pointer" onClick={navigateUsers}>
              Report
            </li>
            <li className="cursor-pointer" onClick={navigateRoute}>
              Users
            </li>
          </ul>
        </div>
        <div className="grid grid-rows-[.08fr_1fr]">
          <div className="bg-blue-300 grid grid-cols-[.2fr_1fr] h-20 md:items-center sm: items-center lg:items-center">
            <div className="ml-10 sm:text-4xl lg:text-2xl text-white">
              <IoNotifications className="hover: cursor-pointer" />
            </div>
            <div className="flex justify-end pr-10">
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="border outline-none px-1.5 py-1 rounded-[.5rem] placeholder-white text-xl"
                placeholder="Search..."
              />
            </div>
          </div>
          <div>
            <Outlet context={{ myData: filteredData, isLoading }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
