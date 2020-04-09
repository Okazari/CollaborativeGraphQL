import styled, { css } from "styled-components";

const getFlexValue = (value) =>
  !value
    ? "1 1 auto"
    : `${parseFloat(value)}` !== value
    ? `0 0 ${value}`
    : `${value} 1 0%`;

const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ flexWrap }) => flexWrap && "wrap"};
  max-height: ${({ maxHeight }) => maxHeight};
  box-sizing: border-box;
  ${({ layout }) =>
    (layout || "").split(" ").map(
      (value, index) => css`
        & > :nth-child(${index + 1}n) {
          box-sizing: border-box;
          flex: ${getFlexValue(value)};
        }
      `
    )};
  ${({ gap = "1.5rem", direction }) =>
    css`
      & > :not(:last-child) {
        margin-${direction === "column" ? "bottom" : "right"}: ${gap};
      }
   `};
  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      ${({ direction }) =>
        direction === "column"
          ? "justify-content"
          : "align-items"}: ${verticalAlign};
    `}
  ${({ horizontalAlign }) =>
    horizontalAlign &&
    css`
      ${({ direction }) =>
        direction === "column"
          ? "align-items"
          : "justify-content"}: ${horizontalAlign};
    `}
`;

export default Flex;
