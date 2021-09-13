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
  const { enabledBannerSection, bannerSection, setBannerSection, setEnabledBannerSection } = useContext(AppContext);

  const handleEnableBannerSectionChange = () => {
    setEnabledBannerSection(!enabledBannerSection);
  };

  const handleFileNameChange = (e) => {
    setBannerSection((prevState) => {
      return { ...prevState, imgFileName: e.target.value };
    });
  };
  const handleAltTagChange = (e) => {
    setBannerSection((prevState) => {
      return { ...prevState, imgAltTag: e.target.value };
    });
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
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Nazwe pliku z banerem"
            variant="outlined"
            helperText="* Maxymalna szerokość grafiki nie powinna być większa niż 1000px "
            defaultValue={bannerSection.imgFileName}
            value={bannerSection.imgFileName}
            onChange={handleFileNameChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj ALT TAG opisujący zdjęcie"
            variant="outlined"
            defaultValue={bannerSection.imgAltTag}
            value={bannerSection.imgAltTag}
            onChange={handleAltTagChange}
          />
        </>
      )}
    </>
  );
};
