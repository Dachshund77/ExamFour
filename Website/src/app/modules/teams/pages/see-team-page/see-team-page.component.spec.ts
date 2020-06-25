import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTeamPageComponent } from './see-team-page.component';

describe('SeeTeamPageComponent', () => {
  let component: SeeTeamPageComponent;
  let fixture: ComponentFixture<SeeTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
