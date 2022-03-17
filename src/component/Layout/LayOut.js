import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
function LayOut(props) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default LayOut;
