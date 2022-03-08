import * as S from './styles';

interface Data {
  value: string;
  label: string;
}
interface Props {
  data: Data[];
  withTooltip?: boolean;
}

const DataRow = ({ data, withTooltip = false }: Props) => {
  // const labelWithoutSpaces = label.replace(' ', '');

  return (
    <>
      {data.map(({ label, value }) => (
        <S.Row>
          <S.LeftSideParagraph>{label}</S.LeftSideParagraph>
          <S.RightSideParagraph>{value}</S.RightSideParagraph>
        </S.Row>
      ))}
    </>
  );
};

export default DataRow;
