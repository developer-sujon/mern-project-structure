//external lib imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import SessionHelper from "./helper/SessionHelper";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const A = () => {
  return <div>hello1</div>;
};
const B = () => {
  return <div>hello2</div>;
};

//enternel lib imports
const App = () => {
  const accessToken = SessionHelper.getToken();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={accessToken ? <RegistrationPage /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </>
  );
};

export default App;
