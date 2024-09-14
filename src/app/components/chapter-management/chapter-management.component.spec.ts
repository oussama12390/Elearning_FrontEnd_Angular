import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagementComponent } from './chapter-management.component';

describe('ChapterManagementComponent', () => {
  let component: ChapterManagementComponent;
  let fixture: ComponentFixture<ChapterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
