import { useHistory } from 'react-router';
import Button from 'components/Button';
import * as URL from '../../routes/url';
import * as S from './styles';

const modules = [
  { name: 'kreator opisów', path: URL.DESCRIPTION_CREATOR },
  { name: 'kreator opisów', path: URL.ACCOUNTANCY },
];

const HomePage = () => {
  const history = useHistory();

  return (
    <>
      <S.Title>Dostępne moduły</S.Title>
      <S.ModulesWrapper>
        {modules.map(({ name, path }) => (
          <Button key={path} onClick={() => history.push(path)}>
            {name}
          </Button>
        ))}
      </S.ModulesWrapper>
    </>
  );
};

export default HomePage;
