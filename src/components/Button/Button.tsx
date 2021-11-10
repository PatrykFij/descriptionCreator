import { CircularProgress } from '@material-ui/core';
import MButton, { ButtonProps } from '@material-ui/core/Button';

interface Props extends ButtonProps {
  isLoading?: boolean;
}

const Button = (props: Props) => {
  const { color = 'primary', variant = 'contained' } = props;
  const buttonProps = { ...props };
  delete buttonProps['isLoading'];
  return (
    <MButton
      {...buttonProps}
      color={color}
      variant={variant}
      disabled={props.disabled || props.isLoading}
      endIcon={props.isLoading ? <CircularProgress size="1rem" /> : ''}
    >
      {props.children}
    </MButton>
  );
};

export default Button;
