import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "config/firerBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const teacherCollRef = collection(db, "teachers");
const uploadFile = async ({ image, id }) => {
  if (!image) return;
  const fileRef = ref(storage, `teachers/${id}`);
  const metaData = {
    contentType: image?.type,
  };
  try {
    await uploadBytes(fileRef, image, metaData);
    const URL = await getDownloadURL(fileRef);
    return URL;
  } catch (error) {
    console.log(error?.message);
  }
};

export const addTeacher = async (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newTeacher = await addDoc(teacherCollRef, {
        fullName: values?.fullName,
        contact: values?.contact,
        country: values?.country,
        email: values?.email,
        status: values?.status,
        education: values?.education,
        speciality: values?.speciality,
        about: values?.about,
        classAssign: values?.classAssign,
        city: values?.city,
      });
      const url = await uploadFile({
        image: values?.profileImage,
        id: newTeacher?.id,
      });

      const teacherDoc = doc(db, "teachers", newTeacher?.id);
      await updateDoc(teacherDoc, { profileImage: url });
      resolve("resolved");
    } catch (error) {
      reject("reject");
    }
  });
};


// update teacher
export const updateTeacher=async(values,teacherData)=>{
  return new Promise(async(resolve, reject) => {
   try {
    const updateTeacher={
      fullName: values?.fullName,
      contact: values?.contact,
      country: values?.country,
      email: values?.email,
      status: values?.status,
      education: values?.education,
      speciality: values?.speciality,
      about: values?.about,
      classAssign: values?.classAssign,
      city: values?.city,
      profileImage:values?.profileImage
    }
    if (values?.profileImage?.size) {
     const URL=await uploadFile({image:values?.profileImage,id:teacherData?.id})
     updateTeacher.profileImage=URL
    }
    const teacherUpdateDoc= doc(db,"teachers",teacherData?.id)
    await updateDoc(teacherUpdateDoc,updateTeacher)
    resolve(updateTeacher)
   } catch (error) {
    reject(error?.message)
   }

    
  })
}

// get teachers

export const getTeachers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const teachers = onSnapshot(teacherCollRef, (allTeachers) => {
        const newTeachers = [];
        allTeachers?.forEach((newTeacher) => {
          newTeachers.push({ ...newTeacher?.data(), id: newTeacher?.id });
        });
        resolve(newTeachers);
      });
      return () => teachers;
    } catch (error) {
      reject(error?.message || error?.code);
    }
  });
};


