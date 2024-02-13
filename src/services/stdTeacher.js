import { db } from "config/firerBase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

//a modal dummy
const id = new Date().toLocaleDateString().replaceAll("/", "-").toString();

// attendance
export const handleUpdate = async (tableData, teaClass, setIsLoading) => {
  setIsLoading(true);
  try {
    const udpateRef = doc(db, `attendance ${teaClass}`, id);
    await setDoc(udpateRef, {
      std: tableData,
    });

    await getStudents(teaClass,);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

// get Teacher
const stdRef = collection(db, "students");
export const getStudents = async (teaClass, oldDate) => {

  return new Promise(async (resolve, reject) => {
    try {
      const attRef = doc(db, `attendance ${teaClass}`, oldDate);
      const docSnap = await getDoc(attRef);

      if (docSnap.exists()) {
        resolve(docSnap.data().std);
      } else if (oldDate === id || oldDate === "") {
        const students = [];
        const q = query(stdRef, where("class", "==", teaClass));
        const stdSnap = await getDocs(q);
        stdSnap?.forEach((student) => {
          students.push({ ...student?.data() });
        });
        resolve(students);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error?.message);
    }
  });
};

// get student attendace
export const getAttendance = async (dateId, setTableData, teaClass) => {
  try {
    const docRef = doc(db, `attendance ${teaClass}`, dateId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTableData(docSnap.data().std);
    }
  } catch (error) {
    console.log(error?.message)
  }
};
