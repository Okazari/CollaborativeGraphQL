import React, { useCallback } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "react-apollo";

const DOMInput = styled.input`
  border: none;
  padding: 5px;
  border-bottom: 1px solid lightgrey;
  &:focus {
    border-color: darkseagreen;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: #729072;
`;

const Input = ({
  inputRef,
  label,
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
    <InputContainer>
      <Label>{label}</Label>
      <DOMInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputContainer>
  );
};
export default Input;
