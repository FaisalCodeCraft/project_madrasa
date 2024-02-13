import AdminLayout from "components/AdminLayout";
import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "config/firerBase";



const AdminStudent = () => {
  const [studentModal, setStudentModal] = useState(false);


  const [search, setSearch] = useState("");

  const [studentData, setStudentData] = useState();

  //refrences
  const studentsCollectionRef = collection(db, "students")
  const oldStdRef = collection(db, "stdPrevData")


  const getStudents = async () => {
    return new Promise(async (resolve, reject) => {

      try {
        const getStudents = query(studentsCollectionRef);
        const querySnapshot = await getDocs(getStudents);
        const student = []
        await Promise.all(
          querySnapshot?.docs.map(async (docs) => {
            if (docs?.data()?.studentOldRecord) {
              const docRef = doc(oldStdRef, docs?.data()?.studentOldRecord);
              const docSnap = await getDoc(docRef);
              student.push({ ...docs.data(), id: docs?.id, ...docSnap?.data() })
            } else {
              student.push({ ...docs.data(), id: docs?.id })
            }

          })
        )
        resolve(student)

      } catch (error) {
        reject("reject")

        console.log(error)
        console.log(error, "faild to get student")
      }

    })
  }
 

useEffect(() => {
  if (search.length >= 2) {
    const searchedStd = studentData.filter((e) =>
      `${e.fullName
        .toLowerCase()} `.includes(
          search.toLowerCase()
        )
    );
    setStudentData(searchedStd);
  } else {
    test()
  }
}, [search])

const test = async () => {

  const snapStd = onSnapshot(studentsCollectionRef, async () => {
    await getStudents().then((e) => setStudentData(e))
  })

  return () => snapStd();
}



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

    <StudentTable studentData={studentData?.length > 0 ? studentData : []}
    />

  </AdminLayout>
);
};

export default AdminStudent;
