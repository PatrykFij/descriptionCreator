import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { TextEditor } from '../../ContentEditable/ContentEditable';

export const DescriptionSection = () => {
  const { setParagraph, paragraph } = useContext(AppContext);

  const handleChange = (e) => {
    setParagraph(e.target.value.trim());
  };
  return <TextEditor value={paragraph} handleChange={handleChange} />;
};
