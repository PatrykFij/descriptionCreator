import styled from "styled-components";
import { useState, useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
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
  width: 100%;
  margin: 10px;
  overflow-y: hidden;
  padding: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: block;
`;

export const Form = () => {
  const { setProducer } = useContext(AppContext);

  const [expanded, setExpanded] = useState(false);

  const handleProducerChange = (e) => {
    setProducer(e.target.value.trim());
  };

  const handleExpandedChange = (section) => (event, isExpanded) => {
    setExpanded(isExpanded ? section : false);
  };

  return (
    <FormWrapper>
      <Accordion expanded={expanded === "section_1"} onChange={handleExpandedChange("section_1")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Nazwa producenta</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <StyledTextField onChange={handleProducerChange} label="Producent nagłówek H4" variant="outlined" />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "section_2"} onChange={handleExpandedChange("section_2")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Górna sekcja z nagłówkami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <TopHeaderSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "section_3"} onChange={handleExpandedChange("section_3")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel2bh-header">
          <h3>Sekcja z opisami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <DescriptionSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "section_4"} onChange={handleExpandedChange("section_4")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja z listą</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <ListSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "section_5"} onChange={handleExpandedChange("section_5")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja z banerem</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <BannerSection />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "section_6"} onChange={handleExpandedChange("section_6")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <h3>Sekcja ze zdjęciami</h3>
        </AccordionSummary>
        <StyledAccordionDetails>
          <PicturesSection />
        </StyledAccordionDetails>
      </Accordion>
    </FormWrapper>
  );
};
