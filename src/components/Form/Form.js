import styled from "styled-components";
import { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TopHeaderSection } from "../Sections/TopHeaderSection/TopHeaderSection";
import { DescriptionSection } from "../Sections/DescriptionSection/DescriptionSection";
import { ListSection } from "../Sections/ListSection/ListSection";
import { BannerSection } from "../Sections/BannerSection/BannerSection";
import { PicturesSection } from "../Sections/PicturesSection/PicturesSection";

import { TextField, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";

const FormWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  margin: 10px;
  padding: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: block;
`;

export const Form = ({
  setProducer,
  setTopHeader,
  setMiddleHeader,
  setBottomHeader,
  setFirstParagraph,
  setSecondParagraph,
  enabledListSection,
  setEnabledListSection,
  setListItems,
  enabledBannerSection,
  setEnabledBannerSection,
  setBannerLink,
  enabledPicturesSection,
  setEnabledPicturesSection,
  setPictureSectionTitle,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleProducerChange = (e) => {
    setProducer(e.target.value.trim());
  };

  const handleExpandedChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FormWrapper>
      <Accordion expanded={expanded === "panel1"} onChange={handleExpandedChange("panel1")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Nazwa producenta</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <StyledTextField onChange={handleProducerChange} label="Producent nagłówek H4" variant="outlined" />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleExpandedChange("panel2")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Górna sekcja z nagłówkami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <TopHeaderSection
            setTopHeader={setTopHeader}
            setMiddleHeader={setMiddleHeader}
            setBottomHeader={setBottomHeader}
          />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel3"} onChange={handleExpandedChange("panel3")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel2bh-header">
          <h3>Sekcja z opisami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <DescriptionSection setFirstParagraph={setFirstParagraph} setSecondParagraph={setSecondParagraph} />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel4"} onChange={handleExpandedChange("panel4")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja z listą</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <ListSection
            enabledListSection={enabledListSection}
            setListItems={setListItems}
            setEnabledListSection={setEnabledListSection}
          />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel5"} onChange={handleExpandedChange("panel5")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja z banerem</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <BannerSection
            enabledBannerSection={enabledBannerSection}
            setBannerLink={setBannerLink}
            setEnabledBannerSection={setEnabledBannerSection}
          />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel6"} onChange={handleExpandedChange("panel6")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja ze zdjęciami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <PicturesSection
            enabledPicturesSection={enabledPicturesSection}
            setEnabledPicturesSection={setEnabledPicturesSection}
            setPictureSectionTitle={setPictureSectionTitle}
          />
        </StyledAccordionDetails>
      </Accordion>
    </FormWrapper>
  );
};
