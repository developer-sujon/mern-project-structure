//external lib imports
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LazyLoader from "./components/MasterLayout/LazyLoader";

//enternel lib imports
const App = () => {
  return (
    <>
      <BrowserRouter></BrowserRouter>
      <LazyLoader />
    </>
  );
};

export default App;
