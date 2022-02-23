import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import SyncAlt from '@material-ui/icons/SyncAlt';
import { Grid } from '@mui/material';
import { useToggle } from 'hooks/useToggle';
import { Autocomplete, Button, IconButton } from 'components';
import ConfirmDialog from 'components/ConfirmDialog';
import { Form } from 'components/Form/Form';
import { Preview } from 'components/Preview/Preview';
import { mapExistingOffer } from 'utils/mappers/mapExistingOffer';
import { offerValidator } from 'utils/offerValidator';
import * as api from '../../api/api';
import { AppContext } from '../../context/AppContext/AppContext';
import * as S from './styles';

export interface MappedOffer {
  id: string;
  name: string;
  description: string;
  url: string;
}

const DescriptionCreator = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const [editedOffer, setEditedOffer] = useState<MappedOffer>();
  const [currentDescription, setCurrentDescription] = useState<string>();

  const { mappedOffers, isLoadingProducts, getProducts } = api.useGetProducts();
  const { updateOffer, isUpdateLoading } = api.useUpdateOffer();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const [isOpenConfirmation, handleOpenConfirmation, handleCloseConfirmation] =
    useToggle();

  const [isOpenAssignDialog, handleOpenAssignDialog, handleCloseAssignDialog] =
    useToggle();

  const parseExistingOffer = useCallback((description: string) => {
    var parser = new DOMParser();
    return parser
      .parseFromString(description, 'text/html')
      .querySelector('.description-container');
  }, []);

  useEffect(() => {
    if (editedOffer) {
      editedOffer.description
        ? setCurrentDescription(editedOffer.description)
        : handleOpenAssignDialog();
    } else {
      setEditedOffer(undefined);
      setProductOfferDescription(undefined);
    }
  }, [
    editedOffer,
    handleOpenAssignDialog,
    parseExistingOffer,
    setProductOfferDescription,
  ]);

  useEffect(() => {
    if (currentDescription) {
      var parser = new DOMParser();
      const existingOffer = parser
        .parseFromString(currentDescription, 'text/html')
        .querySelector('.description-container');
      if (existingOffer) {
        const existingFields = mapExistingOffer(existingOffer);
        setProductOfferDescription(existingFields);
      }
    }
  }, [currentDescription, setProductOfferDescription]);

  const handleSubmit = async () => {
    if (editedOffer?.id) {
      const isValidOffer = offerValidator.validAltTags();
      var previewCode = document
        .getElementById('preview')
        ?.innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');
      if (isValidOffer && previewCode) {
        const data = {
          description: previewCode,
        };
        await updateOffer(editedOffer.id, data);
        toast.success(`Pomyślnie zaktualizowano ofertę: ${editedOffer.name}`);
        handleCloseConfirmation();
      }
    } else {
    }
  };

  const clearDescription = useCallback(() => {
    setCurrentDescription('');
    setProductOfferDescription(undefined);
  }, [setProductOfferDescription]);

  return (
    <>
      <div className="App">
        <S.ToolBar container spacing={2}>
          <Grid item xs={6} md={8}>
            <Autocomplete
              isLoading={isLoadingProducts}
              options={mappedOffers || []}
              onChange={setEditedOffer}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={6}>
                <Button
                  disabled={!currentDescription || !editedOffer}
                  onClick={handleOpenConfirmation}
                  variant="contained"
                  color="primary"
                >
                  Aktualizuj ofertę
                </Button>
              </Grid>
              <Grid item xs={6}>
                <IconButton
                  icon={<Search />}
                  disabled={!editedOffer}
                  onClick={() =>
                    window.open(
                      editedOffer?.url.replace(
                        'www.brillar-sklep.pl/',
                        'sklep992539.shoparena.pl/',
                      ),
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }
                  text="Otwórz podgląd oferty"
                />
              </Grid>
              <Grid item xs={6}>
                <IconButton
                  icon={<SyncAlt />}
                  disabled={!editedOffer}
                  text="Przypisz istniejącą ofertę"
                  onClick={handleOpenAssignDialog}
                />
              </Grid>
              <Grid item xs={6}>
                <IconButton
                  icon={<Delete />}
                  disabled={!editedOffer && !currentDescription}
                  text="Wyczyść istniejącu opis"
                  onClick={clearDescription}
                />
              </Grid>
            </Grid>
          </Grid>
        </S.ToolBar>
        <S.MainWrapper>
          <Form editedOffer={editedOffer} />
          <Preview
            productOfferDescription={productOfferDescription}
            editedOffer={editedOffer}
          />
        </S.MainWrapper>
      </div>
      <ConfirmDialog
        open={isOpenConfirmation}
        title="Potwierdzenie"
        message={`Czy na pewno chcesz zaktualizować ofertę ${editedOffer?.name}`}
        submitText="Aktualizuj"
        onCancel={handleCloseConfirmation}
        cancelText="Anuluj"
        onSubmit={handleSubmit}
        isSubmitDisabled={isUpdateLoading}
      />
      <ConfirmDialog
        open={isOpenAssignDialog}
        title={`Ta oferta nie posiada opisu!`}
        message={`Wybierz ofertę którą chciałbyś przypisać do oferty: ${editedOffer?.name}`}
        content={
          <Autocomplete
            isLoading={isLoadingProducts}
            options={mappedOffers || []}
            disableClearable
            onChange={(offer: MappedOffer) =>
              setCurrentDescription(offer.description)
            }
          />
        }
        submitText="Przypisz"
        onCancel={() => {
          clearDescription();
          handleCloseAssignDialog();
        }}
        cancelText="Anuluj"
        onSubmit={handleCloseAssignDialog}
        isSubmitDisabled={isUpdateLoading}
      />
    </>
  );
};

export default DescriptionCreator;
