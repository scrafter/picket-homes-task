import { keyframes, styled, TextField } from '@mui/material';

const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const Root = styled('div')`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextFieldStyled = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  
  &.validation-error {
      animation-name: ${shakeAnimation};
      animation-duration: 100ms;
      animation-iteration-count: 3;

    .MuiOutlinedInput-notchedOutline {
      border-color: red;
    }
  }
  
  .MuiOutlinedInput-notchedOutline {
    border-color: blue;
    border-width: 2px;
  }
`;

export const SimpleFormStyles = {
    Root,
    TextFieldStyled,
}
