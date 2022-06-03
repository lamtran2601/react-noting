export interface Note {
  id: string;
  tags?: string[];
  data: string;
  created_at?: string;
  updated_at?: string;
  owner_id?: string;
}

export const defaultNote: Note = {
  id: '',
  data: '',
};
