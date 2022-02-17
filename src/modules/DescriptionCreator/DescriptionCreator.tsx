import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress, Snackbar, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { PLTranslation } from 'api/types';
import { useToggle } from 'hooks/useToggle';
import ContainedButton from 'components/Button/ContainedButton';
import OutlinedButton from 'components/Button/OutlinedButton';
import Dialog from 'components/Dialog';
import { Form } from 'components/Form/Form';
import { Preview } from 'components/Preview/Preview';
import { getExistingOfferFields } from 'components/SourceCodeDialog/SourceCodeDialog';
import { offerValidator } from 'utils/offerValidator';
import * as api from '../../api/api';
import {
  AppContext,
  ProductOfferDescription,
} from '../../context/AppContext/AppContext';
import * as S from './styles';

const DescriptionCreator = () => {
  const { setProductOfferDescription } = useContext(AppContext);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isOfferValidatorAlertOpen, setIsOfferValidatorAlertOpen] =
    useState(false);

  const [currentOffer, setCurrentOffer] = useState<PLTranslation | null>(null);
  const { products, getProducts } = api.useGetProducts();
  const { updateOffer, isUpdateLoading } = api.useUpdateOffer(
    currentOffer?.product_id || '',
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (products) {
      setCurrentOffer(products[0].translations.pl_PL);
    }
  }, [products]);

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
      const existingFields = getExistingOfferFields(existingOffer);
      setExistingOffer(existingFields);
    } else {
      //TODO assign description to empty offer
    }
  }, [currentOffer, setExistingOffer]);

  const handleCopyDescriptionCode = async () => {
    if (currentOffer?.product_id) {
      const isValidOffer = offerValidator.validAltTags();
      if (isValidOffer) {
        var previewCode = document
          .getElementById('preview')
          ?.innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');

        await updateOffer({ data: { description: previewCode } });
        toast.success(`Pomyślnie zaktualizowano ofertę: ${currentOffer.name}`);
        handleCloseConfirmation();
      }
    } else {
      setIsOfferValidatorAlertOpen(true);
    }
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
    setIsOfferValidatorAlertOpen(false);
  };

  return (
    <>
      <div className="App">
        <S.ToolBar>
          {products ? (
            <S.StyledOfferSelect
              options={products?.map(({ translations: { pl_PL } }) => pl_PL)}
              defaultValue={products[0].translations.pl_PL}
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
              window.open(
                `${currentOffer?.permalink.replace(
                  'https://www.brillar-sklep.pl',
                  'https://sklep992539.shoparena.pl',
                )}?preview=true`,
                '_blank',
                'noopener,noreferrer',
              )
            }
            aria-label="delete"
          >
            <Search />
          </S.GoToOfferIcon>
        </S.ToolBar>

        {/* <SourceCodeDialog
          isOpen={isSourceCodeDialogOpen}
          setIsOpen={setIsSourceCodeDialogOpen}
        /> */}
        <S.MainWrapper>
          <Form />
          <Preview />
          <S.AlertSnackbar
            // severity="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            open={isOfferValidatorAlertOpen}
            onClose={handleClose}
            message="Nie wprowadzono ALT tagów dla wszystkich zdjęć!"
          />
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isSnackbarOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Skopiowano"
          />
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
              <ContainedButton
                loading={isUpdateLoading}
                onClick={handleCopyDescriptionCode}
              >
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
