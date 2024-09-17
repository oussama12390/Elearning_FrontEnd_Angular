// src/app/models/user.model.ts

import { Image } from "./image.model";

export interface Users {
    id: number;
    email: string;
    password?: string; // Optional since users may not always update their password
    address: string;
    birth_date: string; // Date in string format
    imageId?: string; // Optional field for the image ID
    image:Image;
    name:string;
  }
  