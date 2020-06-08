import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamFormTeamNameComponent } from './search-team-form-team-name.component';

describe('SearchTeamFormTeamNameComponent', () => {
  let component: SearchTeamFormTeamNameComponent;
  let fixture: ComponentFixture<SearchTeamFormTeamNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTeamFormTeamNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeamFormTeamNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
