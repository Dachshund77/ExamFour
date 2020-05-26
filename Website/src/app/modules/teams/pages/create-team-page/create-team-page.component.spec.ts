import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamPageComponent } from './create-team-page.component';

describe('CreateTeamPageComponent', () => {
  let component: CreateTeamPageComponent;
  let fixture: ComponentFixture<CreateTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
