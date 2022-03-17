import React from "react";
import classes from "./footer.module.css";

function Footer() {
  const t = new Date();
  const year = t.getFullYear();

  return (
    <footer className={classes.footer}>
      <p>© copyright {year}</p>
    </footer>
  );
}

export default Footer;
