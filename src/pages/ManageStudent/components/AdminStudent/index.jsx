import AdminLayout from "components/AdminLayout";
import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import { STUDENT_TABLE_DATA } from "constant/content";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db, storage } from "config/firerBase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Box } from "@mui/material";


const AdminStudent = (props) => {
  const [studentModal, setStudentModal] = useState(false);


  const [search, setSearch] = useState("");

  const [studentData, setStudentData] = useState([]);
  const studentsCollectionRef = collection(db, "students")

  useEffect(() => {
    const getStudents = async () => {

      try {
        const students = onSnapshot(studentsCollectionRef, (allNewStudent) => {
          const newStudents = []
          allNewStudent.forEach((newStudent) => {

            newStudents.push({ ...newStudent.data(), id: newStudent.id })
          });
          const allStudents = [...STUDENT_TABLE_DATA, ...newStudents]
          // setStudentData(allStudents) 
          // console.log(student,'students')
          if (search?.length >= 2) {
            const searchedStudent = studentData.filter((e) =>
              `${e.fullName.toLowerCase()} ${e.rNo}`.includes(
                search.toLowerCase()
              )
            );
            setStudentData(searchedStudent);
            // console.log(searchedStudent, ">>>>>>>>>>.")
          } else {
            setStudentData(allStudents);
          }

        })



        // filterStudent.map((item)=>{
        //   alert(item.profileImage,"???????????")
        // })

        return () => students()

        // const allStudents = [...STUDENT_TABLE_DATA]
        // allStudents.map((item) => {
        //   console.log(item.profileImage, "<<<<<allllll>>>>>>")
        // })



        // setStudentData(allStudents)
      } catch (error) {

        console.log(error)
        console.log(error, "faild to get student")
      }


    }
    getStudents();
  }, [search]);


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

      <StudentTable studentData={studentData?.length > 0 ? studentData : []} />
      {/* <Box>
        {
          imageList.map((url) => {
            return <img width={"200px"} src={url} />
          })
        }
      </Box> */}
    </AdminLayout>
  );
};

export default AdminStudent;
