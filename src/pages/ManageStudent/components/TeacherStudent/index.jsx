import Layout from "components/Layout";
import React, { useEffect } from "react";
import Topbar from "./components/Topbar/Topbar";
import DenseTable from "./components/TeacherTable/Table";
import { TABLE_AVATER } from "constant/content";

const TeacherStudent = () => {
  const [search, setSearch] = React.useState("");
  const [tableData, setTableData] = React.useState(TABLE_AVATER);

  useEffect(() => {
    if (search?.length >= 2) {
      const searchedData = tableData.filter((e) =>
        `${e.fName.toLowerCase()} ${e.rollNumber}`.includes(
          search.toLowerCase()
        )
      );
      setTableData(searchedData);
    } else {
      setTableData(TABLE_AVATER);
    }
  }, [search]);

  return (
    <Layout title="Attendence">
      <Topbar search={search} setSearch={setSearch} />
      <DenseTable tableData={tableData} />
    </Layout>
  );
};

export default TeacherStudent;
