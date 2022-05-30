export interface Note {
  id: string;
  tags?: string[];
  data: string;
  created_at?: Date;
  updated_at?: Date;
  owner_id?: string;
}

export const defaultNote: Note = {
  id: '',
  data: '',
};
