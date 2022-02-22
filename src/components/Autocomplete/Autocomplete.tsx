import { TextField } from '@material-ui/core';
import { MappedOffer } from 'modules/DescriptionCreator/DescriptionCreator';
import * as S from './Autocomplete.css';

interface Props {
  options: MappedOffer[];
  isLoading: boolean;
  onChange: (offer: MappedOffer) => void;
  ref?: any;
}

const Autocomplete = ({ options = [], isLoading, onChange, ref }: Props) => {
  console.log(ref);
  return (
    <S.StyledOfferSelect
      options={options}
      loading={isLoading}
      renderInput={(params: any) => (
        <TextField {...params} ref={ref} label="Wybierz ofertę" />
      )}
      getOptionLabel={(option: any) => option.name}
      onChange={(e: any, offer: any) => onChange(offer)}
    />
  );
};

export default Autocomplete;
