import styled from "styled-components";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const BannerSection = () => {
  const { enabledBannerSection, setBannerLink, setEnabledBannerSection } = useContext(AppContext);

  const handleEnableBannerSectionChange = () => {
    setEnabledBannerSection(!enabledBannerSection);
  };

  const handleBannerLinkChange = (e) => {
    setBannerLink("https://www.brillar-sklep.pl/userdata/public/assets/" + e.target.value.trim());
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledBannerSection}
            onChange={handleEnableBannerSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z banerem"
      />
      {enabledBannerSection && (
        <StyledTextField
          id="outlined-multiline-static"
          label="Nazwe pliku z banerem"
          variant="outlined"
          onChange={handleBannerLinkChange}
        />
      )}
    </>
  );
};
