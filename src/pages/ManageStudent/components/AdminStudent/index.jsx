import AdminLayout from "components/AdminLayout";
import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import {  STUDENT_TABLE_DATA } from "constant/content";

const AdminStudent = (props) => {
  const [studentModal, setStudentModal] = useState(false);


  const [search, setSearch] = useState("");

  const [studentData, setStudentData] = useState(STUDENT_TABLE_DATA);
  useEffect(() => {
    if (search?.length >= 2) {
      const searchedStudent = studentData.filter((e) =>
      `${e.fullName.toLowerCase()} ${e.rNo}`.includes(
        search.toLowerCase()
      )
      );
      setStudentData(searchedStudent);
      // console.log(searchedStudent,">>>>>>>>>>.")
    } else {
      setStudentData(STUDENT_TABLE_DATA);
    }
  },[search]);

  return (
    <AdminLayout
      buttonText="Add Student"
      buttonClick={() => setStudentModal(true)}
    >
      {studentModal && (
        <StudentModal
          title="Add Student"
          studentModal={studentModal}
          onClose={() => setStudentModal(false)}
        />
      )}
      <TopBar search={search} setSearch={setSearch} />

      <StudentTable studentData={studentData} />
    </AdminLayout>
  );
};

export default AdminStudent;
