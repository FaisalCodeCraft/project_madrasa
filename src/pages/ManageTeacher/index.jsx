import AdminLayout from "components/AdminLayout";
import React, { useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import TeachersTable from "./components/TeachersTable";
import { TEACHERS_DATA_TABLE } from "constant/content";
import TeacherTopBar from "./components/TeacherTopBar";
import ROUTES from "constant/routes";
import { getTeachers } from "services/teacher";

const ManageTeacher = (props) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedClass, setSelectedClass] = useState("All Options");
  // console.log(selectedClass, ">>>>>>>>>>>.");

  const [teachersData, setTeachersData] = useState();
  // console.log(teachersData, "<<<<<<<<<>>>>>>>>>>>.");


  useEffect(() => {
    if (search?.length >= 2) {
      const searchedTeacher = teachersData.filter((e) =>
        `${e.fullName.toLowerCase()} `.includes(search.toLowerCase())
      );

      setTeachersData(searchedTeacher);
    } else {
      getTeachers().then((e) => setTeachersData(e))

    }
  }, [search]);

  useEffect(() => {
    if (selectedClass === "All Options") {
      getTeachers().then((e) => setTeachersData(e))
    } else {
      getTeachers().then((e) => {
        const searched = e.filter((e) =>
          e?.classAssign.includes(selectedClass));
        // console.log(searched)
        setTeachersData(searched)

      })
    }

  }, [selectedClass]);



  return (
    <AdminLayout
      buttonText="Add Teacher"
      buttonClick={() => navigate(ROUTES.ADMINTEACHER.TEACHERFORM)}
    >
      <TeacherTopBar
        setSearch={setSearch}
        search={search}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />
      <TeachersTable teachersData={teachersData?.length > 0 ? teachersData : []}
       />
    </AdminLayout>
  );
};

export default ManageTeacher;
