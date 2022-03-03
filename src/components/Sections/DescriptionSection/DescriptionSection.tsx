import { useContext } from 'react';
import {
  AppContext,
  ProductOfferDescription,
} from '../../../context/AppContext/AppContext';
import { TextEditor } from '../../ContentEditable/ContentEditable';

export const DescriptionSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          descriptionSection: event.target.value.trim(),
        },
    );
  };

  return (
    <TextEditor
      value={productOfferDescription?.descriptionSection}
      handleChange={handleChange}
    />
  );
};
