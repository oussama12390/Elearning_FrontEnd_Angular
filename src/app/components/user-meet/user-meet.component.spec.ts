import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeetComponent } from './user-meet.component';

describe('UserMeetComponent', () => {
  let component: UserMeetComponent;
  let fixture: ComponentFixture<UserMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMeetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
