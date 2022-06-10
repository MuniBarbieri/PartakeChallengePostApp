import { FunctionComponent } from "react";
import classes from "./Card.module.css";

const Card: FunctionComponent = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
