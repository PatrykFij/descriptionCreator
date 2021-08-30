import styled from "styled-components";
import { TextField, IconButton } from "@material-ui/core";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext/AppContext";
import ContentEditable from "react-contenteditable";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledContentEditable = styled(ContentEditable)`
  font-family: sans-serif;
  width: auto;
  min-height: 100px;
  border: 1px dashed #aaa;
  padding: 5px;
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 30px;
`;

const TextTransforms = [
  {
    icon: <FormatBoldIcon />,
    command: "bold",
  },
  {
    icon: <FormatItalicIcon />,
    command: "italic",
  },
  {
    icon: <FormatUnderlinedIcon />,
    command: "underline",
  },
];

export const DescriptionSection = () => {
  const { setParagraph, paragraph } = useContext(AppContext);

  const [html, setHtml] = useState(paragraph);

  const handleChange = (e) => {
    setHtml(e.target.value.trim());
    setParagraph(e.target.value.trim());
  };

  return (
    <>
      {TextTransforms.map((el) => (
        <IconButton
          onMouseDown={(evt) => {
            evt.preventDefault(); // Avoids loosing focus from the editable area
            document.execCommand(el.command, false); // Send the command to the browser
          }}
          color="inherit"
          component="span"
        >
          {el.icon}
        </IconButton>
      ))}

      <StyledContentEditable
        tagName="pre"
        html={html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={(e) => handleChange(e)} // handle innerHTML change
        // onBlur={this.sanitize}
      />
    </>
  );
};
