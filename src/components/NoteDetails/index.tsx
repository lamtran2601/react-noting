import React from 'react';
import RichMarkdownEditor from 'rich-markdown-editor';

interface NoteDetailsProps {
  id: string;
  defaultValue: string;
  value: string;
  onChange?: (value: string) => void;
  onSave?: (done: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = (props) => {
  const {
    id, defaultValue, value, onChange, onSave, onFocus, onBlur,
  } = props;

  return (
    <RichMarkdownEditor
      id={id}
      defaultValue={defaultValue}
      value={value}
      onChange={(getValue) => onChange && onChange(getValue())}
      onSave={({ done }) => onSave && onSave(done)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
export default NoteDetails;
