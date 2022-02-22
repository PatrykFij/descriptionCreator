import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Search from '@material-ui/icons/Search';
import { useToggle } from 'hooks/useToggle';
import { Autocomplete } from 'components';
import ConfirmDialog from 'components/ConfirmDialog';
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

export interface MappedOffer {
  id: string;
  name: string;
  description: string;
  url: string;
}

const DescriptionCreator = () => {
  const { setProductOfferDescription } = useContext(AppContext);

  const [currentOffer, setCurrentOffer] = useState<MappedOffer>();
  const [currentDescription, setCurrentDescription] = useState<string>();

  const { mappedOffers, isLoadingProducts, getProducts } = api.useGetProducts();
  const { updateOffer, isUpdateLoading } = api.useUpdateOffer();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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

  const [isOpenAssignDialog, handleOpenAssignDialog, handleCloseAssignDialog] =
    useToggle();

  const parseExistingOffer = useCallback((description: string) => {
    var parser = new DOMParser();
    return parser
      .parseFromString(description, 'text/html')
      .querySelector('.description-container');
  }, []);

  useEffect(() => {
    if (currentOffer) {
      setCurrentOffer(currentOffer);
      currentOffer.description
        ? setCurrentDescription(currentOffer.description)
        : handleOpenAssignDialog();
    } else {
      setCurrentDescription(undefined);
    }
  }, [
    currentOffer,
    handleOpenAssignDialog,
    parseExistingOffer,
    setExistingOffer,
  ]);

  useEffect(() => {
    if (currentDescription) {
      var parser = new DOMParser();
      const existingOffer = parser
        .parseFromString(currentDescription, 'text/html')
        .querySelector('.description-container');
      if (existingOffer) {
        const existingFields = mapExistingOffer(existingOffer);
        setExistingOffer(existingFields);
      }
    }
  }, [currentDescription, setExistingOffer]);

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
          <Autocomplete
            isLoading={isLoadingProducts}
            options={mappedOffers || []}
            onChange={setCurrentOffer}
          />
          <S.CustomButton
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
      <ConfirmDialog
        open={isOpenConfirmation}
        title="Potwierdzenie"
        message={`Czy na pewno chcesz zaktualizować ofertę ${currentOffer?.name}`}
        submitText="Aktualizuj"
        onCancel={handleCloseConfirmation}
        cancelText="Anuluj"
        onSubmit={handleSubmit}
        isSubmitDisabled={isUpdateLoading}
      />
      <ConfirmDialog
        open={isOpenAssignDialog}
        title={`Przypisz opis do oferty: ${currentOffer?.name}`}
        message={`Wybierz ofertę którą chciałbyś przypisać`}
        content={
          <Autocomplete
            isLoading={isLoadingProducts}
            options={mappedOffers || []}
            onChange={(offer: MappedOffer) =>
              setCurrentDescription(offer.description)
            }
          />
        }
        submitText="Przypisz"
        onCancel={() => {
          setCurrentDescription('');
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
