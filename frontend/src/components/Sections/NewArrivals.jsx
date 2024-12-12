import React from "react";
import SectionHeading from "./SectionsHeading/SectionHeading";
import Card from "../Card/Card";
import Jeans from "../../assets/img/jeans.jpg";
import Shirts from "../../assets/img/shirts.jpg";
import Tshirt from "../../assets/img/tshirts.jpeg";
import dresses from "../../assets/img/dresses.jpg";
import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/Section.constants";
import "./NewArrivals.css";

const items = [
  {
    title: "Jeans",
    imagePath: Jeans,
  },
  {
    title: "Shirts",
    imagePath: Shirts,
  },
  {
    title: "T-Shirts",
    imagePath: Tshirt,
  },
  {
    title: "Dresses",
    imagePath: dresses,
  },
  {
    title: "Joggers",
    imagePath: require("../../assets/img/joggers.jpg"),
  },
  {
    title: "Kurtis",
    imagePath: require("../../assets/img/kurtis.jpg"),
  },
];

const NewArrivals = () => {
  return <></>;
};

export default NewArrivals;
