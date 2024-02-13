import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import Topbar from "./components/Topbar/Topbar";
import DenseTable from "./components/TeacherTable/Table";
import { COLORS } from "constant/colors";
import { getStudents } from "services/stdTeacher";
import { useAuthContext } from "context/authContext";

const TeacherStudent = () => {
  const [search, setSearch] = React.useState("");

  const [tableData, setTableData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false)
  const context = useAuthContext()


  useEffect(() => {
    if (tableData?.length) {

      if (search?.length >= 2) {
        const searchedData = tableData.filter((e) =>
            `${e?.fullName.toLowerCase()} `.includes(
              search.toLowerCase()
            )
        );
        setTableData(searchedData);
      }
      else {
        test()
      }
    }
    else {
      test()
    }
  }, [search,isLoading,context?.oldDate]);

  const test = () => {
    if (!isLoading) {
      getStudents(context?.user?.classAssign,context?.oldDate).then((stdData) => {
        setTableData(stdData)
      })
    }
  }



  return (
    <Layout title="Attendence">
      <Topbar search={search} setSearch={setSearch} setTableData={setTableData} />

      <DenseTable setIsLoading={setIsLoading} tableData={tableData ? tableData : []} />
    </Layout>
  );
};

export default TeacherStudent;

const btnStyle = {
  display: "flex",
  marginLeft: "auto",
  bgcolor: COLORS.primary.main,
  color: "white",
  mb: "10px",
  border: `1px solid ${COLORS.primary.main}`,
  "&:hover": {
    bgcolor: COLORS.white.main,
    color: "black",
    border: `1px solid ${COLORS.primary.main}`
  }
}