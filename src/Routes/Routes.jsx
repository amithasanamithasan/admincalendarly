import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import Login from "../Pages/Login";
import AdminDashBoard from "../Pages/AdminDashBoard";
import Users from "../AdminPages/Users";
import Bookings from "../AdminPages/Bookings";
import Availabilities from "../AdminPages/Availabilities";
import Holidays from "../AdminPages/Holidays";
import ActivityLogs from "../Pages/ActivityLogs";
import Createmeeting from "../components/Createmeeting";
import Videocall from "../components/Videocall";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  // Admin Dashboard with Layout
  {
    path: "/admin/*",
    element: <Main />,
    children: [
      {
        path: "",
        element: <AdminDashBoard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "availabilities",
        element: <Availabilities />,
      },
      {
        path: "holidays",
        element: <Holidays />,
      },
      {
        path: "activity-logs",
        element: <ActivityLogs />,
      },
      {
        path: "google-meeting",
        element: <Createmeeting />,
      },
    ],
  },
  {
    path: "/room",
    element: <Videocall />,
  },
]);
