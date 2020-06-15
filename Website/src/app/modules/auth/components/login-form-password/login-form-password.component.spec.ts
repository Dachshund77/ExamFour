import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormPasswordComponent } from './login-form-password.component';

describe('LoginFormPasswordComponent', () => {
  let component: LoginFormPasswordComponent;
  let fixture: ComponentFixture<LoginFormPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
