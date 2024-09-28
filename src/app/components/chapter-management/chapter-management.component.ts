// import { Component, OnInit } from '@angular/core';
// import { ChapterService } from '../../service/chapter.service';
// import { Chapter } from '../../components/model/chapter.model';
// import { CourseService } from '../../service/course.service';
// import { Course } from '../model/course.model';



// @Component({
//   selector: 'app-chapter-management',
//   templateUrl: './chapter-management.component.html',
// })
// export class ChapterManagementComponent implements OnInit {
//   chapters: Chapter[] = [];
//   courses: Course[] = [];
  
//   selectedChapter: Chapter = { title: '', content: '', courseId: null };
//   isEditMode = false;

//   constructor(private chapterService: ChapterService, private courseService: CourseService) {}

//   ngOnInit(): void {
//     this.loadChapters();
//     this.loadCourses();
//   }

//   loadChapters(): void {
//     if (this.selectedChapter.courseId !== null) {
//       this.chapterService.getChaptersByCourseId(this.selectedChapter.courseId).subscribe((data) => {
//         this.chapters = data;
      
//       });
//     }
//   }
  

//   loadCourses(): void {
//     this.courseService.getAllCourses().subscribe((data) => {
//       this.courses = data;
//     });
//   }
//   saveChapter(): void {
//     if (this.selectedChapter.courseId !== null && this.selectedChapter.courseId !== undefined) {
//       if (this.isEditMode) {
//         this.chapterService.updateChapter(this.selectedChapter.id!, this.selectedChapter).subscribe(() => {
//           this.resetForm();
//           this.loadChapters();
//         });
//       } else {
//         this.chapterService.createChapter(this.selectedChapter).subscribe(() => {
//           this.resetForm();
//           this.loadChapters();
//         });
//       }
//     } else {
    
//       alert("Please select a valid course before saving the chapter.");
//     }
//   }
  

//   editChapter(chapter: Chapter): void {
//     this.selectedChapter = { ...chapter };
//     this.isEditMode = true;
//   }

//   deleteChapter(id: number): void {
//     this.chapterService.deleteChapter(id).subscribe(() => {
//       this.loadChapters();
//     });
//   }

//   resetForm(): void {
//     this.selectedChapter = { title: '', content: '', courseId: 1 };
//     this.isEditMode = false;
//   }
// }import { Component, OnInit } from '@angular/core';
// src/app/chapter-manager/chapter-manager.component.ts
// src/app/chapter-manager/chapter-manager.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ChapterService } from '../../service/chapter.service';
// import { Chapter } from '../../components/model/chapter.model';
// @Component({
//   selector: 'app-chapter-management',
//   templateUrl: './chapter-management.component.html',
//   styleUrls: ['./chapter-management.component.css']
// })
import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../service/chapter.service';
import { Chapter } from '../../components/model/chapter.model';

@Component({
  selector: 'app-chapter-management',
  templateUrl: './chapter-management.component.html',
  styleUrls: ['./chapter-management.component.css']
})
export class ChapterManagementComponent implements OnInit {
  chapters: Chapter[] = [];
  chapter: Chapter = { id: undefined, title: '', content: '', courseId: null };

  constructor(private chapterService: ChapterService) {}

  ngOnInit(): void {
    this.loadChapters();
  }

  // Charger tous les chapitres
  loadChapters(): void {
    this.chapterService.getAllChapters().subscribe(data => {
      this.chapters = data;
    });
  }

  // Fonction pour sauvegarder (ajouter ou mettre à jour)
  saveChapter(): void {
    if (this.chapter.id) {
      // Si l'ID existe, on met à jour le chapitre
      this.chapterService.updateChapter(this.chapter.title, this.chapter).subscribe(() => {
        alert('Chapitre mis à jour avec succès');
        this.resetForm();  // Réinitialiser le formulaire
        this.loadChapters();  // Recharger les chapitres
      });
    } else {
      // Si pas d'ID, on ajoute un nouveau chapitre
      this.chapterService.createChapter(this.chapter).subscribe(() => {
        alert('Chapitre ajouté avec succès');
        this.resetForm();  // Réinitialiser le formulaire
        this.loadChapters();  // Recharger les chapitres
      });
    }
  }

  // Sélectionner un chapitre pour mise à jour
  selectChapterForUpdate(chapter: Chapter): void {
    this.chapter = { ...chapter };
  }

  // Supprimer un chapitre
  deleteChapter(id: number): void {
    this.chapterService.deleteChapter(id).subscribe(() => {
      this.loadChapters();
      alert('Chapitre supprimé avec succès');
       // Recharger les chapitres après suppression
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.chapter = { id: undefined, title: '', content: '', courseId: null };
  }
}

