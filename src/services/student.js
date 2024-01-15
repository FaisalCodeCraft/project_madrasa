import { db, storage } from "config/firerBase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//student collection refrence
const studentsCollectionRef = collection(db, "students");

//Upload file
const uploadImg = async ({ image, id }) => {
  if (!image) return;
  const imgRef = ref(storage, `students/${id}`);
  const metaData = {
    contentType: image?.type,
  };
  try {
    await uploadBytes(imgRef, image, metaData);

    const URL = await getDownloadURL(imgRef);
    console.log("uploaded successed");
    return URL;
  } catch (error) {
    alert("uploaded,Unsuccess");
  }
};

//create user(student)
export const addNewStudent = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newStudent = await addDoc(studentsCollectionRef, {
        fullName: data.fullName,
        fatherName: data.fatherName,
        contactNo: data.contactNo,
        city: data.city,
        email: data.email,
        country: data.country,
        status: data.status,
        class: data.class,
      });
      const url = await uploadImg({
        image: data?.profileImage,
        id: newStudent?.id,
      });
      const userDoc = doc(db, "students", newStudent?.id);
      await updateDoc(userDoc, { profileImage: url });
      resolve("New student added");
    } catch (error) {
      reject(error?.message || error?.code);
      console.log(error.message, ">>>>>>>>>><<<<<<<<<<<<");
    }
  });
};

//update user(student)
export const updateExistingStd = async (data, studentData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateStudentData = {
        fullName: data.fullName ?? "",
        fatherName: data.fatherName ?? "",
        contactNo: data.contactNo ?? "",
        city: data.city ?? "",
        email: data.email ?? "",
        country: data.country ?? "",
        status: data.status ?? "",
        class: data.class ?? "",
        profileImage: data.profileImage ?? "",
      };

      if (data?.profileImage?.size) {
        // console.log(data?.profileImage?.size, "<<<<>>>>>>>")
        const URL = await uploadImg({
          image: data?.profileImage,
          id: studentData?.id,
        });
        // console.log(URL)
        updateStudentData.profileImage = URL;
      }

      const studentDocRef = doc(db, "students", studentData?.id);
      await updateDoc(studentDocRef, updateStudentData);
      resolve("student is successsfully updated");
    } catch (error) {
      reject(error?.message || error?.code);
      console.log(error.message);
    }
  });
};


//delete or remove the user(student)
export const deleteStudent = async (id) => {
  console.log(id);
  // console.log(studentRef)
  try {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
  } catch (error) {
    console.log(error, "delete unsuccess");
  }
};
