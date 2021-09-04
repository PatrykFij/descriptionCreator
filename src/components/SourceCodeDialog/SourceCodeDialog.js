import { useState, useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";

export const SourceCodeDialog = ({ isOpen, setIsOpen }) => {
  const [sourceCode, setSourceCode] = useState();
  const { setProducer } = useContext(AppContext);

  const handleClose = () => {
    setSourceCode();
    setIsOpen(false);
  };

  const handleApprove = () => {
    var parser = new DOMParser();
    var existingOffer = parser.parseFromString(sourceCode, "text/html").querySelector(".description-container");

    if (existingOffer) {
      const producer = existingOffer
        .querySelector('#producer-logo-section [data-id="a_1"]')
        .href.replace("https://www.brillar-sklep.pl/", "");

      const topHeader = existingOffer.querySelector('#headers-section [data-id="h2_1"]').innerHTML;
      const middleHeader = existingOffer.querySelector('#headers-section [data-id="h3_1"]').innerHTML;
      const bottomHeader = existingOffer.querySelector('#headers-section [data-id="h4_1"]').innerHTML;

      const descriptionSection = existingOffer.querySelector('#description_section [data-id="p_1"]').innerHTML;

      const listSection = {
        title: existingOffer.querySelector('#list_section [data-id="h4_1"]').innerHTML,
        listItems: [...existingOffer.querySelector('#list_section [data-id="ul_1"]').childNodes].map(
          (el) => el.innerHTML
        ),
      };

      const bannerSection = {
        imgFileName: existingOffer
          .querySelector('#banner-section [data-id="img_1"]')
          .src.replace("https://www.brillar-sklep.pl/userdata/public/assets/", ""),
        imgAltTag: existingOffer.querySelector('#banner-section [data-id="img_1"]').alt,
      };

      const pictureSectionTitle = existingOffer.querySelector('#pictures-section [data-id="h4_1"]').innerHTML;
      const pictureSectionItems = existingOffer.querySelectorAll(
        "#pictures-section #pictures-wrapper .image-container"
      );

      console.log(pictureSectionItems);
      // setProducer(producer);
    } else {
      console.log("Błędny format oferty");
    }
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setSourceCode(e.target.value.trim());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kod źródłowy shoper</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wprowadź kod źródłowy istniejącej oferty shoper i zawtwierdź, aby rozpocząć edycje.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Kod żródłowy"
          multiline
          rows={10}
          value={sourceCode}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Zamknij
        </Button>
        <Button onClick={handleApprove} color="primary">
          Zatwierdź
        </Button>
      </DialogActions>
    </Dialog>
  );
};
