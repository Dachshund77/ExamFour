import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRacesPageComponent } from './create-races-page.component';

describe('CreateRacesPageComponent', () => {
  let component: CreateRacesPageComponent;
  let fixture: ComponentFixture<CreateRacesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRacesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRacesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
