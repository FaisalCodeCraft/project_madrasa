import React from "react";
import AdminSetting from "./components/AdminSetting";
import TeacherSetting from "./components/TeacherSetting";

// type Props = {};

const ManageSetting = (props) => {
  const user = { type: 'admin' }

  return user.type === "admin" ? <AdminSetting /> : <TeacherSetting />;
};

export default ManageSetting;
