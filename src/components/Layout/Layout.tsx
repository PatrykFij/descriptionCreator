import { ReactNode } from 'react';
import Header from 'components/Header';
import * as S from './styles';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <S.MainContainer>{children}</S.MainContainer>
    </>
  );
};

export default Layout;
