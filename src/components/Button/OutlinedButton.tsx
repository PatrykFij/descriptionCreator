import { CircularProgress } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

type Props = ButtonProps & {
  loading?: boolean;
};

export default (props: Props) => {
  const { color = 'primary', disabled, loading } = props;
  const buttonProps = { ...props };
  delete buttonProps['loading'];
  return (
    <Button
      variant="outlined"
      {...buttonProps}
      color={color}
      disabled={disabled || loading}
      endIcon={loading ? <CircularProgress size="1rem" /> : ''}
    />
  );
};
