import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamFormComponent } from './search-team-form.component';

describe('SearchTeamFormComponent', () => {
  let component: SearchTeamFormComponent;
  let fixture: ComponentFixture<SearchTeamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTeamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
