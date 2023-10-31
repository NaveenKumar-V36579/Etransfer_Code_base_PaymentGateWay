import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ProgressBar from "../ProgressBar";

export default props => (
  <div className="page">
    <Header showCart={props.showCart} />
    <div className="content">
      <ProgressBar isVisible={false} />
      {props.children}
    </div>
    <Footer />
  </div>
);
