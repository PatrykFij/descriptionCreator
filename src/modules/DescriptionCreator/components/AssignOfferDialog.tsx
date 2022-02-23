import { useState } from 'react';
import { Autocomplete, ConfirmDialog } from 'components';
import { MappedOffer } from '../DescriptionCreator';

interface Props {
  open: boolean;
  title: string;
  message: string;
  isLoading: boolean;
  options?: MappedOffer[];
  onSubmit: (selectedDescription: string) => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
}
const AssignOfferDialog = ({
  open,
  title = `Ta oferta nie posiada opisu!`,
  message,
  isLoading,
  options,
  onSubmit,
  onCancel,
  isSubmitDisabled,
}: Props) => {
  const [selectedDescription, setSelectedDescription] = useState<string>();

  return (
    <ConfirmDialog
      open={open}
      title={title}
      message={message}
      content={
        <Autocomplete
          isLoading={isLoading}
          options={options || []}
          disableClearable
          onChange={(offer: MappedOffer) =>
            setSelectedDescription(offer.description)
          }
        />
      }
      submitText="Przypisz"
      onCancel={onCancel}
      cancelText="Anuluj"
      onSubmit={() => {
        if (selectedDescription) {
          onSubmit(selectedDescription);
        }
        onCancel();
      }}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};

export default AssignOfferDialog;
