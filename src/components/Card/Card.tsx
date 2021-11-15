import { ReactNode } from 'react';
import {
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import { default as MEditIcon } from '@material-ui/icons/Edit';
import * as S from './styles';

interface Props {
  title?: string;
  canEdit?: boolean;
  children?: ReactNode;
  withoutPadding?: boolean;
  onEditClick?: () => void;
  customHeader?: JSX.Element;
  isLoading?: boolean;
  customAction?: JSX.Element;
  isHeader?: boolean;
  id?: string;
}

const Card = ({
  title,
  canEdit,
  children,
  withoutPadding,
  onEditClick,
  customHeader,
  isLoading,
  customAction,
  isHeader = true,
  id,
}: Props) => {
  return (
    <S.CardWrapper id={id} withoutpadding={withoutPadding?.toString()}>
      {isLoading && (
        <S.PreloaderWrapper>
          <CircularProgress />
        </S.PreloaderWrapper>
      )}
      {isHeader && (
        <S.Header>
          {customHeader && customHeader}
          {title && <Typography variant="h3">{title}</Typography>}
          {canEdit && (
            <IconButton onClick={onEditClick} color="primary">
              <MEditIcon />
            </IconButton>
          )}
          {customAction && customAction}
        </S.Header>
      )}
      <CardContent>{children}</CardContent>
    </S.CardWrapper>
  );
};

export default Card;
