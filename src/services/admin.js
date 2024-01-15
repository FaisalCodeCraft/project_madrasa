import { db, storage } from "config/firerBase";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Admin Collection ref 
const adminCollectionRef = collection(db, "admins")

//Upload files
 const uploadFile = async ({ image, id }) => {
  if (!image) return;
  const adminImgRef = ref(storage, `admins/${id}`)
  const metaData = {
    contentType: image?.type
  }
  try {
    await uploadBytes(adminImgRef, image, metaData)
    const URL = await getDownloadURL(adminImgRef)
    return URL;

  } catch (error) {
    console.log(error.message)
  }
}
//Creates Admin
export const createAdmin = async (values,onClose) => {
return new Promise(async(resolve, reject) => {
  try {
    const addNewAdmin = await addDoc(adminCollectionRef, {
      role: values.role,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,

    })
    const url = await uploadFile({ image: values?.profileImage, id: addNewAdmin?.id });
    const adminUserDoc = doc(db, "admins", addNewAdmin?.id)
    await updateDoc(adminUserDoc, { profileImage: url })
    resolve("New admin created")
    onClose()
  } catch (error) {
    reject(error?.message || error?.code)
    console.log(error.message, ">>>>>>>>>><<<<<<<<<<<<")
  }
})
}

//Controls updates of Admin
export  const updateAdmin = async (values,adminData) => {
 return new Promise(async(resolve, reject) => {
  try {

    const updateAdminData = {
      role: values.role ?? "",
      firstName: values.firstName ?? "",
      lastName: values.lastName ?? "",
      email: values.email ?? "",
      password: values.password ?? "",
      phoneNumber: values.phoneNumber ?? "",
      profileImage: values.profileImage ?? ""
    }
    if (values?.profileImage?.size) {
      const url = await uploadFile({ image: values?.profileImage, id: adminData?.id });
      updateAdminData.profileImage = url
    }
    const adminUserDoc = doc(db, "admins", adminData?.id)
    await updateDoc(adminUserDoc, updateAdminData)
    resolve("Updated")
  } catch (error) {
    reject(error?.message || error?.code)
    console.log(error.message, ">>>>>>>>>><<<<<<<<<<<<")

  }
 })
}


//Controls admins to delete specific admin profile
export const  deleteAdmin=async(adminData)=>{
        return new Promise(async(resolve, reject) => {
            
           try {
                const adminRef = doc(db, "admins", adminData?.id)
                await deleteDoc(adminRef)
                resolve("deleted")
               
              } catch (error) {
                reject(error?.message || error?.code)
                console.log(error,"<<<<<<<>>>>>>>>>>")
              } 

        })

    }