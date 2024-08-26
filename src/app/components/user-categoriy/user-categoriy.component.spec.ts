import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoriyComponent } from './user-categoriy.component';

describe('UserCategoriyComponent', () => {
  let component: UserCategoriyComponent;
  let fixture: ComponentFixture<UserCategoriyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCategoriyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCategoriyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
