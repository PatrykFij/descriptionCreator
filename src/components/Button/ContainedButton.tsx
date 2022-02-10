import { forwardRef, useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

type Props = ButtonProps & {
  loading?: boolean;
};

export default forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { color = 'primary', disabled, loading } = props;
  const buttonProps = { ...props };
  delete buttonProps['loading'];

  const endIcon = useMemo(() => {
    if (props.loading && !props.endIcon) {
      return <CircularProgress size="1rem" />;
    } else if (!props.loading && props.endIcon) {
      return props.endIcon;
    } else {
      return '';
    }
  }, [props.endIcon, props.loading]);

  return (
    <Button
      ref={ref}
      variant="contained"
      {...buttonProps}
      color={color}
      disabled={disabled || loading}
      endIcon={endIcon}
    />
  );
});
