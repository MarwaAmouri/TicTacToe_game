import React from "react";

export default function Timer(props) {
   return (
      <div className={`cell ${props.className}`} onClick={props.onClick}>
         {props.value}
      </div>
   );
}