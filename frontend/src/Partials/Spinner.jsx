import React, { Spinner } from "react-bootstrap";

function MySpinner() {
  return (
    <>
      <Spinner animation="border" role="status" variant="primary" className="spinner">
        <span className="visually-hidden m-auto">Loading...</span>
      </Spinner>
    </>
  );
}

export default MySpinner;
