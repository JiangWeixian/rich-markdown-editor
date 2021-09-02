import React from "react";
import styled from "styled-components";

const Item = styled.span`
  border-radius: 100%;
  aspect-ratio: 1 / 1;
  width: 20px;
  display: inline-block;
  align-self: center;
  &.red {
    background-color: #fbbfbc;
  }

  &.yellow {
    background-color: #fff895;
  }

  &.green {
    background-color: #c5f1c1;
  }
`;

type ColorifyItemProps = {
  className: string;
};

export const ColorifyItem = (props: ColorifyItemProps) => {
  return <Item className={props.className} />;
};
