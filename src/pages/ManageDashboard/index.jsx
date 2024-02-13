import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import { useAuthContext } from "context/authContext";


const ManageDashboard = (props) => {
  const context = useAuthContext()
  return context?.user?.type === "Admin" ? <AdminDashboard />  : context?.user?.type === "Teacher" ? <TeacherDashboard /> : null;
};

export default ManageDashboard;
