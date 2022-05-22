import { getNotes } from "apis/note";
import Loading from "components/Loading";
import NoteList from "components/NoteList";
import useRequest from "hooks/useRequest";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NoteListContainer = () => {
  const {
    data: notes = [],
    error,
    loading,
  } = useRequest(() => getNotes({ from: 0, to: 9 }));

  const navigate = useNavigate();

  const handleNoteClick = useCallback(
    (id: string) => {
      navigate(`/note/${id}`);
    },
    [navigate]
  );

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <Loading />;
  }

  return <NoteList notes={notes} onNoteClick={handleNoteClick} />;
};
export default NoteListContainer;
