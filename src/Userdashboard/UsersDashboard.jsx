import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UsersLink from "./Pages/UsersLink";

const UsersDashboard = () => {
  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-emerald-400 text-white p-4 space-y-4  ">
          <nav className="space-y-2">
            <Link
              to="UsersLink"
              className="block hover:bg-cyan-100 p-2 text-black hover:text-green-600 text-center text-2xl rounded-2xl"
            >
              Users
            </Link>
          </nav>
          <div className="mt-6 space-y-2"></div>
          <button className="mt-6 w-full bg-red-500 p-2 rounded">Logout</button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-center text-3xl font-semibold font-serif my-4 text-cyan-600 border w-[600px] mx-auto h-[60px] p-3 rounded-2xl ">
            UsersDashboard
          </h2>
          <Routes>
            <Route path="/UsersLink" element={<UsersLink />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
