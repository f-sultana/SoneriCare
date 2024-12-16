import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../utils/theme";

const baseStyles = css`
  font-family: "DM Sans", sans-serif;
  font-weight: normal;
  color: ${colors.primary};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const largeTitle = css`
  ${baseStyles}
  font-size: 24px;
  font-weight: 900;
  line-height: 28px;
`;

const title = css`
  ${baseStyles}
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
`;

const subtitle = css`
  ${baseStyles}
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;

const largeText = css`
  ${baseStyles}
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const text = css`
  ${baseStyles}
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const tag = css`
  ${baseStyles}
  font-size: 10px;
  font-weight: 700;
  line-height: 20px;
`;

const StyledText = styled.p`
  ${(props) => props.variant === "largeTitle" && largeTitle}
  ${(props) => props.variant === "title" && title}
  ${(props) => props.variant === "subtitle" && subtitle}
  ${(props) => props.variant === "largeText" && largeText}
  ${(props) => props.variant === "text" && text}
  ${(props) => props.variant === "tag" && tag};
  margin: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: left;
`;

const Text = ({ style, children, color, variant = "text", ...rest }) => {
  return (
    <StyledText color={color} variant={variant} style={style} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;
