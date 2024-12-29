import React from "react";

function Footer() {
  return (
    <div>
      <footer className="text-center mt-5 m-auto text-light">
        <p style={{fontSize:"0.8rem"}}>Copyright © {new Date().getFullYear()}{" "}  kitchaid.se All rights reserved</p>
        
        <p style={{fontSize:"0.7rem"}}>Version 1.1.5</p>
      </footer>
    </div>
  );
}

export default Footer;
