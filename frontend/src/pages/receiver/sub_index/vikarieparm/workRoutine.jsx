import React from "react";
import FoodRoutine from "./routineComponent/foodRoutine";
import Sections from "./routineComponent/sections";
import SpecialFood from "./routineComponent/specialFood";
import Signininfo from "./routineComponent/signininfo";
import ContactInfo from "./routineComponent/contactInfo";
import { Accordion } from "react-bootstrap";

function NewRoutine() {
  return (
    <>
            <Accordion defaultActiveKey="0" className="w-75 m-auto">
              <Sections />
              <FoodRoutine />
              <SpecialFood />
              <Signininfo />
              <ContactInfo />
            </Accordion>
    </>
  );
}

export default NewRoutine;
