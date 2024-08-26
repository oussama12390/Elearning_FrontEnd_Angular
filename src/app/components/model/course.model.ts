export interface Course {
    id?: number;
    name: string;
    description: string;
    ourUsers?: any; // Vous pouvez remplacer `any` par le type `OurUsers` si vous avez un modèle pour cela
    category?: any; // Idem ici pour `Category`
  }

  