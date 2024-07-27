import React from "react";

export type props = {
  name: string;
};

export const Amr = ({ name }: props) => {
  return <div>{name}</div>;
};
