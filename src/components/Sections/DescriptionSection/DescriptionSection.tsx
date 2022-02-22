import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { TextEditor } from '../../ContentEditable/ContentEditable';

export const DescriptionSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleChange = (event: any) => {
    setProductOfferDescription((prev) => ({
      ...prev,
      descriptionSection: event.target.value.trim(),
    }));
  };
  return (
    <TextEditor
      value={productOfferDescription.descriptionSection}
      handleChange={handleChange}
    />
  );
};
