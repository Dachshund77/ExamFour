import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamPageComponent } from './manage-team-page.component';

describe('ManageTeamPageComponent', () => {
  let component: ManageTeamPageComponent;
  let fixture: ComponentFixture<ManageTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
