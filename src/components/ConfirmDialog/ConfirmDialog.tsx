import { ReactNode } from 'react';
import { ContainedButton, Dialog, OutlinedButton } from 'components';
import * as S from './ConfirmDialog.css';

interface Props {
  open: boolean;
  title?: string;
  message?: string | JSX.Element;
  submitText?: string;
  cancelText?: string;
  onSubmit: () => void;
  onCancel: () => void;
  isCancelVisible?: boolean;
  isSubmitDisabled?: boolean;
  content?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
}

const ConfirmDialog = ({
  open,
  title = 'Delete confirmation',
  message,
  submitText = 'OK',
  cancelText = 'Cancel',
  onSubmit,
  onCancel,
  isCancelVisible = true,
  isSubmitDisabled = false,
  content,
}: Props) => {
  return (
    <Dialog
      title={title}
      open={open}
      onClose={onCancel}
      maxWidth="md"
      dialogActions={
        <>
          {isCancelVisible && (
            <OutlinedButton onClick={onCancel}>{cancelText}</OutlinedButton>
          )}
          <ContainedButton onClick={onSubmit} disabled={isSubmitDisabled}>
            {submitText}
          </ContainedButton>
        </>
      }
    >
      {message && <S.Message>{message}</S.Message>}
      {content && <S.ContentWrapper>{content}</S.ContentWrapper>}
    </Dialog>
  );
};

export default ConfirmDialog;
