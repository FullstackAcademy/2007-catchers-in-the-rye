import styled from "@emotion/styled";

const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#F75F1C" : "#85E21F")};
  box-shadow: ${props =>
    props.disabled
      ? "none"
      : "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6;"};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #000000;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
