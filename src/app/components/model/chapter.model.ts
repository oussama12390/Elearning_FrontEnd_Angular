// src/app/chapter.model.ts
export interface Chapter {
  id?: number;
  title: string;
  content: string;
  courseId: number|null;
}
