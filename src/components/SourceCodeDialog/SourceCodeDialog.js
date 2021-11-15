import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext/AppContext';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Snackbar,
} from '@material-ui/core';

const getExistingOfferFields = (existingOffer) => {
  const producer = existingOffer
    .querySelector('#producer-logo-section [data-id="a_1"]')
    .href.replace('https://www.brillar-sklep.pl/', '');

  const topHeader = existingOffer.querySelector(
    '#headers-section [data-id="h2_1"]',
  )
    ? existingOffer.querySelector('#headers-section [data-id="h2_1"]').innerHTML
    : '';

  const middleHeader = existingOffer.querySelector(
    '#headers-section [data-id="h3_1"]',
  )
    ? existingOffer.querySelector('#headers-section [data-id="h3_1"]').innerHTML
    : '';

  const bottomHeader = existingOffer.querySelector(
    '#headers-section [data-id="h4_1"]',
  )
    ? existingOffer.querySelector('#headers-section [data-id="h4_1"]').innerHTML
    : '';

  const descriptionSection = existingOffer.querySelector(
    '#description-section [data-id="p_1"]',
  )
    ? existingOffer.querySelector('#description-section [data-id="p_1"]')
        .innerHTML
    : '';

  const listSection = {
    title: existingOffer.querySelector('#list-section [data-id="h4_1"]')
      ? existingOffer.querySelector('#list-section [data-id="h4_1"]').innerHTML
      : '',
    listItems: existingOffer.querySelector('#list-section [data-id="ul_1"]')
      ? [
          ...existingOffer.querySelectorAll(
            '#list-section [data-id="ul_1"] > li',
          ),
        ].map((el) => el.innerHTML)
      : [],
  };

  const bannerSection = {
    imgFileName: existingOffer.querySelector(
      '#banner-section [data-id="img_1"]',
    )
      ? existingOffer
          .querySelector('#banner-section [data-id="img_1"]')
          .src.replace(`${window.location.origin}/userdata/public/assets/`, '')
      : '',
    imgAltTag: existingOffer.querySelector('#banner-section [data-id="img_1"]')
      ? existingOffer.querySelector('#banner-section [data-id="img_1"]').alt
      : '',
  };
  debugger;
  const pictureSectionTitle = existingOffer.querySelector(
    '#pictures-section [data-id="h4_1"]',
  )
    ? existingOffer.querySelector('#pictures-section [data-id="h4_1"]')
        .innerHTML
    : '';

  let pictureSectionItems = [
    ...existingOffer.querySelectorAll(
      '#pictures-section #pictures-wrapper .image-container',
    ),
  ];

  pictureSectionItems = pictureSectionItems.length
    ? pictureSectionItems.map((el) => ({
        url: el.querySelector('[data-id="img_1"]')
          ? el
              .querySelector('[data-id="img_1"]')
              .src.replace(
                `${window.location.origin}/userdata/public/assets/`,
                '',
              )
          : '',
        alt: el.querySelector('[data-id="img_1"]')
          ? el.querySelector('[data-id="img_1"]').alt
          : '',
        title: el.querySelector('[data-id="h5_1"]')
          ? el.querySelector('[data-id="h5_1"]').innerHTML
          : el.querySelector('[data-id="h5_1"]'),
        description: el.querySelector('[data-id="p_1"]')
          ? el.querySelector('[data-id="p_1"]').innerHTML
          : '',
      }))
    : [];

  const videoSection = {
    sectionTitle: existingOffer.querySelector('#video-section [data-id="h4_1"]')
      ? existingOffer
          .querySelector('#video-section [data-id="h4_1"]')
          .innerHTML.trim()
      : '',
    description: existingOffer.querySelector('#video-section [data-id="p_1"]')
      ? existingOffer
          .querySelector('#video-section [data-id="p_1"]')
          .innerHTML.replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, '')
      : '',
    videoUrl: existingOffer.querySelector('#video-section [data-id="iframe_1"]')
      ? existingOffer
          .querySelector('#video-section [data-id="iframe_1"]')
          .src.trim()
      : '',
  };

  return {
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
  };
};

export const SourceCodeDialog = ({ isOpen, setIsOpen }) => {
  const [sourceCode, setSourceCode] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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

  const handleClose = () => {
    setSourceCode();
    setIsOpen(false);
  };

  const setExistingOffer = ({
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
  }) => {
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
  };

  const setEnabledSections = (existingOffer) => {
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

    const isVideoSectionEnabled = existingOffer.querySelector('#video-section');
    setEnabledVideoSection(!!isVideoSectionEnabled);
    if (!isVideoSectionEnabled) {
      setVideoSection({
        sectionTitle: '',
        description: '',
        videoTitle: '',
        videoUrl: '',
      });
    }
  };

  const handleApprove = () => {
    var parser = new DOMParser();
    var existingOffer = parser
      .parseFromString(sourceCode, 'text/html')
      .querySelector('.description-container');

    if (existingOffer) {
      const existingFields = getExistingOfferFields(existingOffer);
      setExistingOffer(existingFields);
      setEnabledSections(existingOffer);
    } else {
      setIsSnackbarOpen(true);
    }
    setSourceCode();
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setSourceCode(e.target.value.trim());
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Kod źródłowy shoper</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wprowadź kod źródłowy istniejącej oferty shoper i zawtwierdź, aby
            rozpocząć edycje.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Kod żródłowy"
            multiline
            rows={10}
            value={sourceCode}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Zamknij
          </Button>
          <Button onClick={handleApprove} color="primary">
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Błędny format oferty"
      />
    </>
  );
};
