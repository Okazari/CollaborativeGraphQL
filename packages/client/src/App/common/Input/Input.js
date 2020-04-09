import React, { useCallback } from "react";
import styled from "styled-components";
import { Rows } from "../flexs";
import Label from "../Label";

const DOMInput = styled.input`
  border: none;
  padding: 5px;
  border-bottom: 1px solid lightgrey;
  &:focus {
    border-color: darkseagreen;
  }
`;
const Input = ({
  inputRef,
  label,
  type,
  placeholder,
  onChange: _onChange,
  value,
}) => {
  const onChange = useCallback(
    (e) => {
      _onChange(e.currentTarget.value);
    },
    [_onChange]
  );
  return (
    <Rows gap="0.5rem">
      <Label>{label}</Label>
      <DOMInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </Rows>
  );
};
export default Input;
