import React from "react";
import Link from "next/link";

import classes from "./button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        <span className={classes.btn}>{props.children}</span>
      </Link>
    );
  }

  return (
    <button onClick={props.link} className={classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
