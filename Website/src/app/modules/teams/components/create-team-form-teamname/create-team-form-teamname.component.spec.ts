import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamFormTeamnameComponent } from './create-team-form-teamname.component';

describe('CreateTeamFormTeamnameComponent', () => {
  let component: CreateTeamFormTeamnameComponent;
  let fixture: ComponentFixture<CreateTeamFormTeamnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamFormTeamnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamFormTeamnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
