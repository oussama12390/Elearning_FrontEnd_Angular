export interface Course {
  id?: number;
  name: string;
  description: string;
  categoryId?: number | null;
  ourUsersId?: number | null;
}
