import { useContext } from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 10px 0;
  }
`;

export const TopHeaderSection = () => {
  const {
    topHeader,
    middleHeader,
    bottomHeader,
    setTopHeader,
    setMiddleHeader,
    setBottomHeader,
  } = useContext(AppContext);

  const handleTopHeaderChange = (e) => {
    setTopHeader(e.target.value);
  };

  const handleMiddleHeaderChange = (e) => {
    setMiddleHeader(e.target.value);
  };

  const handleBottomHeaderChange = (e) => {
    setBottomHeader(e.target.value);
  };

  return (
    <>
      <StyledTextField
        onChange={handleTopHeaderChange}
        defaultValue={topHeader}
        value={topHeader}
        label="Nagłówek H2"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleMiddleHeaderChange}
        defaultValue={middleHeader}
        value={middleHeader}
        label="Nagłówek H3"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleBottomHeaderChange}
        defaultValue={bottomHeader}
        value={bottomHeader}
        label="Nagłówek H4"
        variant="outlined"
      />
    </>
  );
};
