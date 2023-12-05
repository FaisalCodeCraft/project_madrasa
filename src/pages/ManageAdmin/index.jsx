import AdminLayout from "components/AdminLayout";
import { ADMINS } from "constant/content";
import React from "react";
import Grid from "@mui/material/Grid";
import AdminCard from "./components/AdminCard";
import AdminModal from "./components/AdminModal";


const ManageAdmin = () => {

  const [adminModal, setAdminModal] = React.useState(false)
  
  return (
    <AdminLayout
      buttonText="Add Admin"
      buttonClick={() => setAdminModal(true)}
    >
      <Grid container columns={10} spacing={3}>
        {ADMINS?.map((data, i) => {
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
