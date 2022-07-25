import React, { Suspense } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";

//Internal Lib Import
import logo from "../assets/images/logo.svg";
import LazyLoader from "../components/MasterLayout/LazyLoader";

const AppNavigation = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <Suspense fallback={<LazyLoader />}>
        <Navbar className="fixed-top px-0 shadow-sm ">
          <Container fluid={true}>
            <Navbar.Brand>
              <button className="icon-nav m-0 h5 btn btn-link">
                <AiOutlineMenuUnfold />
              </button>
              <Link to="/">
                <img className="nav-logo mx-2" src={logo} alt="logo" />
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Suspense>
    </>
  );
};

export default AppNavigation;
