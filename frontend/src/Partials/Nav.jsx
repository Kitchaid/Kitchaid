import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
// import { getKitchenFunctionContentForClient } from "../hooks/security/useUserLogin"
// import { useQuery, useQueryClient } from "react-query";
import { contextData } from "../ContextApi";
import { dashboardRoutes } from "../appRoutes";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";

function NavIcons() {
  const { userdata } = useContext(contextData);
  // const { data: functionContent } = useQuery(
  //   ["getKitchenFunctionContentForClient",],
  //   () => getKitchenFunctionContentForClient());
  // const queryClient = useQueryClient();
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
  const routers = dashboardRoutes();
  const getBrandText = () => {
    for (let i = 0; i < routers.length; i++) {
      if (location.pathname.indexOf(routers[i].path) !== -1) {
        return routers[i].name;
      }
    }
    return <></>
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Navbar bg="light" expand="lg">
            <Col lg={10}>
              <Button
                variant="dark"
                onClick={mobileSidebarToggle}
              >
                <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
              </Button>
              <Navbar.Brand
                href="#home"
                onClick={(e) => e.preventDefault()}
                className="ms-2"
              >
                {getBrandText()}
              </Navbar.Brand>
            </Col>
            <Col lg={2}>
              <div className="text-left me-5 mt-3">
                <p className="text-dark font-size-xs">
                  Välkommen <br />
                  <strong>{userdata.username}</strong>
                </p>
              </div>
            </Col>
          </Navbar>
        </Row>
      </Container>
    </>
  );
}

export default NavIcons;
