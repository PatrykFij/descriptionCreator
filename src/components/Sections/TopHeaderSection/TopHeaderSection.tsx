import { useContext } from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledTextField = styled(TextField)`
  & {
    width: 100%;
    margin: 10px 0;
  }
`;

export const TopHeaderSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleTopHeaderChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      topHeader: event.target.value,
    }));
  };

  const handleMiddleHeaderChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      middleHeader: event.target.value,
    }));
  };

  const handleBottomHeaderChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      bottomHeader: event.target.value,
    }));
  };

  return (
    <>
      <StyledTextField
        onChange={handleTopHeaderChange}
        defaultValue={productOfferDescription?.topHeader}
        value={productOfferDescription?.topHeader}
        label="Nagłówek H2"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleMiddleHeaderChange}
        defaultValue={productOfferDescription?.middleHeader}
        value={productOfferDescription?.middleHeader}
        label="Nagłówek H3"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleBottomHeaderChange}
        defaultValue={productOfferDescription?.bottomHeader}
        value={productOfferDescription?.bottomHeader}
        label="Nagłówek H4"
        variant="outlined"
      />
    </>
  );
};
