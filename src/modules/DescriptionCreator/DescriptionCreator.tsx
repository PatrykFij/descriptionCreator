import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { useToggle } from 'hooks/useToggle';
import ContainedButton from 'components/Button/ContainedButton';
import OutlinedButton from 'components/Button/OutlinedButton';
import Dialog from 'components/Dialog';
import { Form } from 'components/Form/Form';
import { Preview } from 'components/Preview/Preview';
import { mapExistingOffer } from 'utils/mappers/mapExistingOffer';
import { offerValidator } from 'utils/offerValidator';
import * as api from '../../api/api';
import {
  AppContext,
  ProductOfferDescription,
} from '../../context/AppContext/AppContext';
import * as S from './styles';

interface MappedOffer {
  id: string;
  name: string;
  description: string;
  url: string;
}

const DescriptionCreator = () => {
  const { setProductOfferDescription } = useContext(AppContext);

  const [currentOffer, setCurrentOffer] = useState<MappedOffer>();

  const { mappedOffers, getProducts } = api.useGetProducts();
  const { updateOffer, isUpdateLoading } = api.useUpdateOffer();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (mappedOffers) {
      setCurrentOffer(mappedOffers[0]);
    }
  }, [mappedOffers]);

  const setExistingOffer = useCallback(
    (existingOffer: any) => {
      setProductOfferDescription((prev: ProductOfferDescription) => ({
        ...prev,
        ...existingOffer,
      }));
    },
    [setProductOfferDescription],
  );

  const [isOpenConfirmation, handleOpenConfirmation, handleCloseConfirmation] =
    useToggle();

  useEffect(() => {
    if (currentOffer && currentOffer.description) {
      var parser = new DOMParser();
      var existingOffer = parser
        .parseFromString(currentOffer.description, 'text/html')
        .querySelector('.description-container');
      if (existingOffer) {
        const existingFields = mapExistingOffer(existingOffer);
        setExistingOffer(existingFields);
      }
    } else {
      //TODO assign description to empty offer
    }
  }, [currentOffer, setExistingOffer]);

  const handleSubmit = async () => {
    if (currentOffer?.id) {
      const isValidOffer = offerValidator.validAltTags();
      var previewCode = document
        .getElementById('preview')
        ?.innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');
      if (isValidOffer && previewCode) {
        const data = {
          description: previewCode,
        };
        await updateOffer(currentOffer.id, data);
        toast.success(`Pomyślnie zaktualizowano ofertę: ${currentOffer.name}`);
        handleCloseConfirmation();
      }
    } else {
    }
  };

  return (
    <>
      <div className="App">
        <S.ToolBar>
          {mappedOffers ? (
            <S.StyledOfferSelect
              options={mappedOffers}
              defaultValue={mappedOffers[0]}
              renderInput={(params: any) => (
                <TextField {...params} label="Wybierz ofertę" />
              )}
              getOptionLabel={(option: any) => option.name}
              onChange={(e: any, offer: any) => setCurrentOffer(offer)}
            />
          ) : (
            <CircularProgress />
          )}
          <S.CustomButton
            // onClick={handleCopyDescriptionCode}
            onClick={handleOpenConfirmation}
            variant="contained"
            color="primary"
          >
            Aktualizuj ofertę
          </S.CustomButton>
          <S.GoToOfferIcon
            onClick={() =>
              window.open(currentOffer?.url, '_blank', 'noopener,noreferrer')
            }
            aria-label="delete"
          >
            <Search />
          </S.GoToOfferIcon>
        </S.ToolBar>
        <S.MainWrapper>
          <Form />
          <Preview />
        </S.MainWrapper>
      </div>
      <>
        <Dialog
          open={isOpenConfirmation}
          onClose={handleCloseConfirmation}
          maxWidth="xs"
          title={'Potwierdzenie'}
          dialogActions={
            <>
              <OutlinedButton onClick={handleCloseConfirmation}>
                Anuluj
              </OutlinedButton>
              <ContainedButton loading={isUpdateLoading} onClick={handleSubmit}>
                Aktualizuj
              </ContainedButton>
            </>
          }
        >
          <p>Czy na pewno chcesz zaktualizować ofertę {currentOffer?.name}</p>
        </Dialog>
      </>
    </>
  );
};

export default DescriptionCreator;
