import { MouseEvent, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
import { IconButton } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import * as _ from 'lodash';
import styled from 'styled-components';

const StyledContentEditable = styled(ContentEditable)`
  font-family: sans-serif;
  width: auto;
  min-height: 100px;
  border: 1px dashed #aaa;
  padding: 5px;
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 30px;
  width: 100%;
`;

const TextTransforms = [
  {
    icon: <FormatBoldIcon />,
    command: 'bold',
  },
  {
    icon: <FormatItalicIcon />,
    command: 'italic',
  },
  {
    icon: <FormatUnderlinedIcon />,
    command: 'underline',
  },
];

export const TextEditor = ({ value = '', handleChange }: any) => {
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '<br><br>');
      return false;
    }
  };

  const debounceFunc = useCallback(
    _.debounce((e) => handleChange(e), 500),
    [],
  );

  const handleThrottledChange = (e: any) => {
    debounceFunc(e);
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text');
    window.document.execCommand('insertText', false, text.replace(/\n/g, ''));
  };

  return (
    <>
      {TextTransforms.map((el) => (
        <IconButton
          onMouseDown={(event: MouseEvent<EventTarget>) => {
            event.preventDefault();
            document.execCommand(el.command, false);
          }}
          color="inherit"
          component="span"
        >
          {el.icon}
        </IconButton>
      ))}
      <StyledContentEditable
        tagName="pre"
        html={value}
        disabled={false}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleThrottledChange(e)}
        onPaste={(e) => handlePaste(e)}
      />
    </>
  );
};
