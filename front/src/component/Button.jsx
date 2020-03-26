import React from "react";
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '_', m: '__', v: '-' })

const styles = cn('Button');

const Button = (props) => {
  let classes;

  if (props.style === undefined) {
    classes = "Button Button__color-control Button__padding-control Button__height-default"
  } else {
    classes = styles(props.style);
  }

  return (
    <button className={classes}>
      {props.children}
    </button>
  )

};

export default Button;