import { Model } from './Model';

export interface Note extends Model{
  tags?: string[];
  data: string;
  owner_id?: string;
}

export const defaultNote: Note = {
  id: '',
  data: '',
};
