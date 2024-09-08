import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSiteComponent } from './personalsite.component';

describe('PersonalsiteComponent', () => {
  let component: PersonalSiteComponent;
  let fixture: ComponentFixture<PersonalSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
