import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRacesPageComponent } from './manage-races-page.component';

describe('ManageRacesPageComponent', () => {
  let component: ManageRacesPageComponent;
  let fixture: ComponentFixture<ManageRacesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRacesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRacesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
