import AdminLayout from "components/AdminLayout";
import { ADMINS } from "constant/content";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import AdminCard from "./components/AdminCard";
import AdminModal from "./components/AdminModal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "config/firerBase";


const ManageAdmin = () => {
  const [adminModal, setAdminModal] = React.useState(false)

  const [adminData, setAdminData] = useState([])
  const adminCollectionRef = collection(db, "admins")
  useEffect(() => {

    const getAdmins = async () => {
      try {
        const admins = onSnapshot(adminCollectionRef, (allAdmins) => {
          const newAdmins = [];
          allAdmins.forEach((newAdmin) => {
            newAdmins.push({ ...newAdmin?.data(), id: newAdmin?.id })
          })
          setAdminData(newAdmins)
          
        })
        return () => admins();
      } catch (error) {
        console.log(error, "<<<<<<<|||failed to get admins|||>>>>>>>>>>")
      }
    }
    getAdmins();

  }, [])


  return (
    <AdminLayout
      buttonText="Add Admin"
      buttonClick={() => setAdminModal(true)}
    >
      <Grid container columns={10} spacing={3}>
        {adminData?.map((data, i) => {
          return (
            <Grid key={i} item md={2.5} sm={5} xs={10}>
              <AdminCard data={data} />
            </Grid>
          );
        })}
      </Grid>
      {adminModal && (
        <AdminModal
          title="Add Admin"
          adminModal={adminModal}
          onClose={() => setAdminModal(false)}
          setAddAdminModal={setAdminModal}
        />
      )}
    </AdminLayout>
  );
};

export default ManageAdmin;
