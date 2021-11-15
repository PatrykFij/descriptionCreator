import { useContext } from 'react';
import { AuthContext } from 'context/AuthProvider/AuthProvider';
import * as URL from '../../routes/url';
import Logo from './Logo';
import * as S from './styles';

const menuLinks = [
  { label: 'Kreator Opisów', link: URL.DESCRIPTION_CREATOR },
  { label: 'Księgowość', link: URL.ACCOUNTANCY },
];

const Header = () => {
  const isAuthenticated = useContext(AuthContext);

  return (
    <S.Header>
      <S.HeaderToolbar>
        <S.LeftToolbar>
          <S.MainMenuBox>
            <S.LogoLink to={URL.ROOT}>
              <Logo />
            </S.LogoLink>
          </S.MainMenuBox>
        </S.LeftToolbar>
        <S.RightToolbar>
          {isAuthenticated && (
            <>
              {menuLinks.map(({ link, label }) => (
                <S.MainMenuBox key={link}>
                  <S.MainMenuLink to={link}>{label}</S.MainMenuLink>
                </S.MainMenuBox>
              ))}
            </>
          )}
        </S.RightToolbar>
      </S.HeaderToolbar>
    </S.Header>
  );
};

export default Header;
