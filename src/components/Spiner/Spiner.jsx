import React from "react";

import Spinner from "react-bootstrap/Spinner";

const Spiner = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
        &nbsp; Loading...
      </div>
    </>
  );
};

export default Spiner;
