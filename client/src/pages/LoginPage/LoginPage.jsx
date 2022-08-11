import React, { Suspense, lazy } from "react";

//Internal Lib Import
import AppNavigation from "../../partials/AppNavigation";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";

const LoginUser = lazy(() => import("../../components/LoginUser/LoginUser"));

const LoginPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      {/* <MasterLayout><AppNavigation title="Login Page" /></MasterLayout> */}
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
