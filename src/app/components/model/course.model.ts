export interface Course {
  id?: number;
  name: string;
  description: string;
  categoryId?: number | null;
  ourUsersId?: number | null;
  imageId?: number | null; // Assurez-vous que ce champ est présent // Champ pour l'URL de l'image  // Utilisez ArrayBuffer pour stocker les données binaires
}
