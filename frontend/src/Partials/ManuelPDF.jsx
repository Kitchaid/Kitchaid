import React from "react";

const FileDownloadPB = () => {
  // Function will execute on click of button
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("Kitchaid_Manuelle.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Kitchaid_Manuelle.pdf";
        alink.click();
      });
    });
  };
  return (
    <>
      <span className="ms-2 small" onClick={onButtonClick}>
        Hur funkar appen?
      </span>
    </>
  );
};

export default FileDownloadPB;
