export interface Course {
  id?: number;
  name: string;
  description: string;
  categoryId?: number | null;
  ourUsersId?: number | null;
  image?: ArrayBuffer;  // Utilisez ArrayBuffer pour stocker les données binaires
}
