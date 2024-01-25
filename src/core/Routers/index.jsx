import ROUTES from "constant/routes";
import ManageAuth from "pages/ManageAuth";
import ManageAdmin from "pages/ManageAdmin";
import ManageStudent from "pages/ManageStudent";
import ManageSetting from "pages/ManageSetting";
import ManageTeacher from "pages/ManageTeacher";
import ManageDashboard from "pages/ManageDashboard";
import {  Route, Routes } from "react-router-dom";
import TeacherForm from "pages/ManageTeacher/components/TeacherForm";
import SecureRoute from "hoc/SecureRoute";

const Routers = () => {



  return (
    <Routes>
      <Route element={<SecureRoute />} >
        <Route path={ROUTES.COMMON.DASHBOARD} element={<ManageDashboard />} />
        <Route path={ROUTES.ADMIN.ADMINS} element={<ManageAdmin />} />
        <Route path={ROUTES.ADMIN.TEACHERS} element={<ManageTeacher />} />
        <Route path={ROUTES.COMMON.SETTINGS} element={<ManageSetting />} />
        <Route path={ROUTES.COMMON.STUDENTS} element={<ManageStudent />} />
        <Route path={ROUTES.ADMINTEACHER.TEACHERFORM} element={<TeacherForm />} />
      </Route>

      <Route path={ROUTES.AUTH.SIGN_IN} element={<ManageAuth />} />
      <Route exact path={'/'} element={<ManageAuth />} />

    </Routes>
  );
};

export default Routers;
