//external lib imports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const LoginUser = lazy(() => import("../../components/LoginUser/LoginUser"));

const RegistrationPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Registration Page" />
      <LoginUser />
    </Suspense>
  );
};

export default RegistrationPage;
