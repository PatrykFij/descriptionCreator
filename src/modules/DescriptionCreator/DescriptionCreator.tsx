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

  return (
    <>
      <div className="App">
        <S.ToolBar>
          <Autocomplete
            isLoading={isLoadingProducts}
            options={mappedOffers || []}
            onChange={setEditedOffer}
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
              window.open(
                editedOffer?.url.replace(
                  'www.brillar-sklep.pl/',
                  'sklep992539.shoparena.pl/',
                ),
                '_blank',
                'noopener,noreferrer',
              )
            }
            aria-label="delete"
          >
            <Search />
          </S.GoToOfferIcon>
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
          setCurrentDescription('');
          setProductOfferDescription(undefined);
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
