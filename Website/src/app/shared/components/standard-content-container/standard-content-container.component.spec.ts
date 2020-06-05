import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardContentContainerComponent } from './standard-content-container.component';

describe('StandardContentContainerComponent', () => {
  let component: StandardContentContainerComponent;
  let fixture: ComponentFixture<StandardContentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardContentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
