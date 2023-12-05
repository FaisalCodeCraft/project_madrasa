import React from 'react'
import AdminStudent from './components/AdminStudent';
import TeacherStudent from './components/TeacherStudent';
import { useAuthContext } from 'context/authContext';


const ManageStudent = (props) => {
  // const user = {type:"admin"}
  const context=useAuthContext()

  return context?.user?.type === "admin" ? <AdminStudent /> : <TeacherStudent />;
}

export default ManageStudent