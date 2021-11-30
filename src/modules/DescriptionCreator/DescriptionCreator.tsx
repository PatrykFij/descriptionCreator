import React, { useState } from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import { Form } from 'modules/DescriptionCreator/components/Sections/Sections';
import { Preview } from 'modules/DescriptionCreator/components/Preview/Preview';
import { SourceCodeDialog } from 'components/SourceCodeDialog/SourceCodeDialog';
import { offerValidator } from 'utils/offerValidator';
import * as S from './styles';

const DescriptionCreator = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSourceCodeDialogOpen, setIsSourceCodeDialogOpen] = useState(false);
  const [isOfferValidatorAlertOpen, setIsOfferValidatorAlertOpen] =
    useState(false);

  const handleCopyDescriptionCode = () => {
    const isValidOffer = offerValidator.validAltTags();
    if (isValidOffer) {
      var previewCode = document
        .getElementById('preview')
        ?.innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');
      navigator.clipboard.writeText(previewCode || '');
      setIsSnackbarOpen(true);
    } else {
      setIsOfferValidatorAlertOpen(true);
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('descriptionValues');
    window.location.reload();
  };

  const handleOpenSourceCodeDialog = () => {
    setIsSourceCodeDialogOpen(true);
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
        <S.CustomButton
          onClick={handleCopyDescriptionCode}
          variant="contained"
          color="primary"
        >
          Kopiuj kod źródłowy opisu
        </S.CustomButton>
        <S.CustomButton
          onClick={handleClearLocalStorage}
          variant="contained"
          color="secondary"
        >
          Wyczyść pamięć podręczną
        </S.CustomButton>
        <S.CustomButton
          onClick={handleOpenSourceCodeDialog}
          variant="contained"
          color="default"
        >
          Wprowadź istniejącą ofertę
        </S.CustomButton>
        <SourceCodeDialog
          isOpen={isSourceCodeDialogOpen}
          setIsOpen={setIsSourceCodeDialogOpen}
        />
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
    </>
  );
};

export default DescriptionCreator;
