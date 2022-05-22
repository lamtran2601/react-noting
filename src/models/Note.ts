export interface Note {
  id: string;
  tags?: string[];
  data: string;
  createdAt?: Date;
  updatedAt?: Date;
}
