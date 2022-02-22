import { TextField } from '@material-ui/core';
import { MappedOffer } from 'modules/DescriptionCreator/DescriptionCreator';
import * as S from './Autocomplete.css';

interface Props {
  options: MappedOffer[];
  isLoading: boolean;
  onChange: (offer: MappedOffer) => void;
}

const Autocomplete = ({ options = [], isLoading, onChange }: Props) => {
  return (
    <S.StyledOfferSelect
      options={options}
      loading={isLoading}
      renderInput={(params: any) => (
        <TextField {...params} label="Wybierz ofertę" />
      )}
      getOptionLabel={(option: any) => option.name}
      onChange={(e: any, offer: any) => onChange(offer)}
    />
  );
};

export default Autocomplete;
