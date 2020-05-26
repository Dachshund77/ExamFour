import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRacesPageComponent } from './search-races-page.component';

describe('SearchRacesPageComponent', () => {
  let component: SearchRacesPageComponent;
  let fixture: ComponentFixture<SearchRacesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRacesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRacesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
