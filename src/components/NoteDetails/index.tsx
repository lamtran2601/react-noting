import React from 'react';
import RichMarkdownEditor from 'rich-markdown-editor';

interface NoteDetailsProps {
  id: string;
  content: string;
  onChange?: (value: string) => void;
  onSave?: (done: boolean) => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = (props) => {
  const {
    id, content, onChange, onSave,
  } = props;

  return (
    <RichMarkdownEditor
      id={id}
      autoFocus
      defaultValue={content}
      onChange={(getValue) => onChange && onChange(getValue())}
      onSave={({ done }) => onSave && onSave(done)}
    />
  );
};
export default NoteDetails;
