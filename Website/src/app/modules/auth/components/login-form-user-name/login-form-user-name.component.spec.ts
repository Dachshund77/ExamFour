import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormUserNameComponent } from './login-form-user-name.component';

describe('LoginFormUserNameComponent', () => {
  let component: LoginFormUserNameComponent;
  let fixture: ComponentFixture<LoginFormUserNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormUserNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
