import AdminLayout from "components/AdminLayout";
import React, { useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import TeachersTable from "./components/TeachersTable";
import { TEACHERS_DATA_TABLE } from "constant/content";
import TeacherTopBar from "./components/TeacherTopBar";
import ROUTES from "constant/routes";

const ManageTeacher = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedClass, setSelectedClass] = useState("All Options");
  // console.log(selectedClass, ">>>>>>>>>>>.");

  const [teachersData, setTeachersData] = useState(TEACHERS_DATA_TABLE);

  useEffect(() => {
    if (search?.length >= 2) {
      const searchedTeacher = TEACHERS_DATA_TABLE.filter((e) =>
        `${e.fullName.toLowerCase()} `.includes(search.toLowerCase())
      );

      setTeachersData(searchedTeacher);
    } else {
      setTeachersData(TEACHERS_DATA_TABLE);
    }
  }, [search]);

  useEffect(() => {
    if (selectedClass) {
      if (selectedClass === "All Options") {
        setTeachersData(TEACHERS_DATA_TABLE);
      } else {
        const classAssigned = TEACHERS_DATA_TABLE.filter((e) =>
          `${e.classAssign}`.includes(selectedClass)
        );
        setTeachersData(classAssigned);
      }
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
      <TeachersTable teachersData={teachersData} />
    </AdminLayout>
  );
};

export default ManageTeacher;
