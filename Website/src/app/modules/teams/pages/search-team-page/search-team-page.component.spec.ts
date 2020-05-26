import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamPageComponent } from './search-team-page.component';

describe('SearchTeamPageComponent', () => {
  let component: SearchTeamPageComponent;
  let fixture: ComponentFixture<SearchTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
