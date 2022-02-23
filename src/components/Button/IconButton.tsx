import { IconButton as MIconButton } from '@material-ui/core';

interface Props {
  icon: JSX.Element;
  text?: string;
  disabled?: boolean;
  onClick: () => void;
}

const IconButton = ({ icon, text, disabled = false, onClick }: Props) => {
  return (
    <MIconButton disabled={disabled} onClick={onClick}>
      {icon}
      {text && <span>{text}</span>}
    </MIconButton>
  );
};

export default IconButton;
