import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useQueryClient } from "react-query";
import Hero from './Hero';

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const logout = () => {
    // Clear user session and navigate to login
    localStorage.clear();
    queryClient.clear();
    navigate("/");
  };

  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: color,
        backgroundImage: image ? `url(${image})` : "none",
      }}
    >
      <div className="sidebar-background">
        {image && (
          <div
            style={{
              backgroundImage: `url(${image})`,
              opacity: 0.8,
            }}
          />
        )}
      </div>
      <div className="sidebar-wrapper">
        {/* Logo Section */}
        <div className="logo d-flex align-items-center justify-content-start">
          <a className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <Hero />
            </div>
          </a>
        </div>

        {/* Navigation Links */}
        <Nav className="flex-column">
          {routes?.map((prop, key) => {
            if (!prop.redirect)
              return (
                <Nav.Item
                  key={key}
                  className={prop.upgrade ? "active-pro" : activeRoute(prop.layout + prop.path)}
                >
                  <NavLink to={prop.path} className="nav-link">
                    <i className={prop.icon} />
                    <span className="ms-2 font-size-s">{prop.name}</span>
                  </NavLink>
                </Nav.Item>
              );
            return null;
          })}
          {/* Logout Link */}
          <Nav.Item>
            <div className="nav-link cursor" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket fa-xl"></i>
              <span className="ms-2 font-size-s">Logout</span>
            </div>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
