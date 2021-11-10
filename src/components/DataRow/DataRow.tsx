import { Tooltip } from '@material-ui/core';
import * as S from './styles';

interface Props {
  label: string;
  value?: string | null;
  withTooltip?: boolean;
}

const DataRow = ({ label, value = '', withTooltip = false }: Props) => {
  const labelWithoutSpaces = label.replace(' ', '');

  return (
    <S.Row data-testid={`data-row-wrapper-${labelWithoutSpaces}`}>
      <S.LeftSideParagraph data-testid={`data-row-label-${labelWithoutSpaces}`}>
        {label}
      </S.LeftSideParagraph>
      {withTooltip && value ? (
        <Tooltip title={value}>
          <S.RightSideParagraph
            data-testid={`data-row-value-${labelWithoutSpaces}`}
          >
            <span>{value}</span>
          </S.RightSideParagraph>
        </Tooltip>
      ) : (
        <S.RightSideParagraph
          data-testid={`data-row-value-${labelWithoutSpaces}`}
        >
          {value}
        </S.RightSideParagraph>
      )}
    </S.Row>
  );
};

export default DataRow;
