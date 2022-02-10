import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress, Snackbar, TextField } from '@material-ui/core';
import { PLTranslation } from 'api/types';
import { Form } from 'components/Form/Form';
import { Preview } from 'components/Preview/Preview';
import {
  getExistingOfferFields,
  SourceCodeDialog,
} from 'components/SourceCodeDialog/SourceCodeDialog';
import { offerValidator } from 'utils/offerValidator';
import * as api from '../../api/api';
import { AppContext } from '../../context/AppContext/AppContext';
import * as S from './styles';

const DescriptionCreator = () => {
  const {
    setProducer,
    setTopHeader,
    setMiddleHeader,
    setBottomHeader,
    setParagraph,
    setListSection,
    setEnabledListSection,
    setBannerSection,
    setEnabledBannerSection,
    setPictureSectionTitle,
    setPictureItems,
    setEnabledPicturesSection,
    setVideoSection,
    setEnabledVideoSection,
  } = useContext(AppContext);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSourceCodeDialogOpen, setIsSourceCodeDialogOpen] = useState(false);
  const [isOfferValidatorAlertOpen, setIsOfferValidatorAlertOpen] =
    useState(false);

  const [currentOffer, setCurrentOffer] = useState<PLTranslation | null>(null);
  const { products, getProducts } = api.useGetProducts();
  const { updateOffer } = api.useUpdateOffer(currentOffer?.product_id || '');

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const setExistingOffer = useCallback(
    ({
      producer,
      topHeader,
      middleHeader,
      bottomHeader,
      descriptionSection,
      listSection,
      bannerSection,
      pictureSectionTitle,
      pictureSectionItems,
      videoSection,
    }: any) => {
      setProducer(producer);
      setTopHeader(topHeader);
      setMiddleHeader(middleHeader);
      setBottomHeader(bottomHeader);
      setParagraph(descriptionSection);
      setListSection(listSection);
      setBannerSection(bannerSection);
      setPictureSectionTitle(pictureSectionTitle);
      setPictureItems(pictureSectionItems);
      setVideoSection(videoSection);
    },
    [
      setBannerSection,
      setBottomHeader,
      setListSection,
      setMiddleHeader,
      setParagraph,
      setPictureItems,
      setPictureSectionTitle,
      setProducer,
      setTopHeader,
      setVideoSection,
    ],
  );

  const setEnabledSections = useCallback(
    (existingOffer: any) => {
      const isListSectionEnabled = existingOffer.querySelector('#list-section');
      setEnabledListSection(!!isListSectionEnabled);
      if (!isListSectionEnabled) {
        setListSection({ title: '', listItems: [] });
      }

      const isBannerSectionEnabled =
        existingOffer.querySelector('#banner-section');
      setEnabledBannerSection(!!isBannerSectionEnabled);
      if (!isBannerSectionEnabled) {
        setBannerSection({ imgAltTag: '', imgFileName: '' });
      }

      const isPicturesSectionEnabled =
        existingOffer.querySelector('#pictures-section');
      setEnabledPicturesSection(!!isPicturesSectionEnabled);
      if (!isPicturesSectionEnabled) {
        setPictureSectionTitle('');
        setPictureItems([]);
      }

      const isVideoSectionEnabled =
        existingOffer.querySelector('#video-section');
      setEnabledVideoSection(!!isVideoSectionEnabled);
      if (!isVideoSectionEnabled) {
        setVideoSection({
          sectionTitle: '',
          description: '',
          videoTitle: '',
          videoUrl: '',
        });
      }
    },
    [
      setBannerSection,
      setEnabledBannerSection,
      setEnabledListSection,
      setEnabledPicturesSection,
      setEnabledVideoSection,
      setListSection,
      setPictureItems,
      setPictureSectionTitle,
      setVideoSection,
    ],
  );

  useEffect(() => {
    if (currentOffer) {
      var parser = new DOMParser();
      var existingOffer = parser
        .parseFromString(currentOffer.description, 'text/html')
        .querySelector('.description-container');
      const existingFields = getExistingOfferFields(existingOffer);
      setExistingOffer(existingFields);
      setEnabledSections(existingOffer);
    }
  }, [currentOffer, setEnabledSections, setExistingOffer]);

  const handleCopyDescriptionCode = async () => {
    if (currentOffer?.product_id) {
      const isValidOffer = offerValidator.validAltTags();
      if (isValidOffer) {
        var previewCode = document
          .getElementById('preview')
          ?.innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');

        await updateOffer({ data: { description: previewCode } });
        toast.success(`Pomyślnie zaktualizowano ofertę: ${currentOffer.name}`);
        setIsSnackbarOpen(true);
      }
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
          Aktualizuj ofertę
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
        {products ? (
          <S.StyledOfferSelect
            options={products?.map(({ translations: { pl_PL } }) => pl_PL)}
            renderInput={(params: any) => (
              <TextField {...params} label="Wybierz ofertę" />
            )}
            getOptionLabel={(option: any) => option.name}
            onChange={(e: any, offer: any) => setCurrentOffer(offer)}
          />
        ) : (
          <CircularProgress />
        )}

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
